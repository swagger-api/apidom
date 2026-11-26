import http from 'node:http';
import { type AddressInfo } from 'node:net';
import { assert } from 'chai';
import sinon from 'sinon';

import HttpResolverAxios from '../../../../src/resolve/resolvers/http-axios/index.ts';
import ResolverError from '../../../../src/errors/ResolverError.ts';
import File from '../../../../src/File.ts';
import { parse, UnmatchedResolverError } from '../../../../src/index.ts';

describe('resolve', function () {
  context('resolvers', function () {
    context('HttpResolverAxios', function () {
      context('urlAllowList', function () {
        context('canRead', function () {
          specify('should allow any http(s) URL when urlAllowList is undefined', function () {
            const resolver = new HttpResolverAxios();

            assert.isTrue(resolver.canRead(new File({ uri: 'http://example.com/a.json' })));
            assert.isTrue(resolver.canRead(new File({ uri: 'https://example.com/a.json' })));
          });

          specify('should allow no URL when urlAllowList is empty', function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [] });

            assert.isFalse(resolver.canRead(new File({ uri: 'https://example.com/a.json' })));
          });

          specify('should match RegExp entries', function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [/^https:\/\//] });

            assert.isTrue(resolver.canRead(new File({ uri: 'https://example.com/a.json' })));
            assert.isFalse(resolver.canRead(new File({ uri: 'http://example.com/a.json' })));
          });

          specify('should match glob entries', function () {
            const resolver = new HttpResolverAxios({
              urlAllowList: ['https://schemas.example.com/**'],
            });

            assert.isTrue(
              resolver.canRead(new File({ uri: 'https://schemas.example.com/v1/pet.json' })),
            );
            assert.isFalse(
              resolver.canRead(new File({ uri: 'https://schemas.example.com.evil.com/pet.json' })),
            );
          });

          specify('should match a glob against the full URL', function () {
            const resolver = new HttpResolverAxios({ urlAllowList: ['*.json'] });

            assert.isFalse(resolver.canRead(new File({ uri: 'https://example.com/a.json' })));
          });

          specify('should give the same result on every call with a global RegExp', function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [/^https:\/\//g] });
            const file = new File({ uri: 'https://example.com/a.json' });

            assert.isTrue(resolver.canRead(file));
            assert.isTrue(resolver.canRead(file));
            assert.isTrue(resolver.canRead(file));
          });

          specify('should never read non-http URLs', function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [/.*/] });

            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.json' })));
          });
        });

        context('read with redirects', function () {
          let server: http.Server;
          let origin: string;

          before(function (done) {
            server = http.createServer((req, res) => {
              if (req.url === '/start') {
                res.statusCode = 302;
                res.setHeader('Location', `${origin}/target`);
                res.end();
                return;
              }
              res.setHeader('Content-Type', 'application/json');
              res.end('{"ok":true}');
            });
            server.listen(0, () => {
              origin = `http://localhost:${(server.address() as AddressInfo).port}`;
              done();
            });
          });

          after(function (done) {
            server.close(() => done());
          });

          specify('should follow a redirect to an allowed URL', async function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [/^http:\/\/localhost:\d+\//] });
            const data = await resolver.read(new File({ uri: `${origin}/start` }));

            assert.deepEqual(JSON.parse(data.toString()), { ok: true });
          });

          specify('should reject a redirect to a URL that is not allowed', async function () {
            const resolver = new HttpResolverAxios({ urlAllowList: [/\/start$/] });

            try {
              await resolver.read(new File({ uri: `${origin}/start` }));
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.instanceOf(error, ResolverError);
              assert.include(
                String((error.cause as Error)?.message),
                'is not allowed by urlAllowList',
              );
            }
          });

          specify('should still call a configured beforeRedirect', async function () {
            const beforeRedirect = sinon.spy();
            const resolver = new HttpResolverAxios({
              urlAllowList: [/^http:\/\/localhost:\d+\//],
              axiosConfig: { beforeRedirect },
            });
            await resolver.read(new File({ uri: `${origin}/start` }));

            assert.isTrue(beforeRedirect.calledOnce);
          });

          context('and cacheTTL', function () {
            let originalCaches: any;
            let cache: Map<string, Response>;
            const readStart = (resolvers: HttpResolverAxios[]) =>
              parse(`${origin}/start`, {
                resolve: { resolvers, resolverOpts: { cacheTTL: 1000 } },
              });
            const assertRedirectRejected = async (resolvers: HttpResolverAxios[]) => {
              try {
                await readStart(resolvers);
                assert.fail('should throw ResolverError');
              } catch (error: any) {
                assert.include(
                  String(error.cause?.cause?.cause?.message ?? error.cause?.cause?.message),
                  'is not allowed by urlAllowList',
                );
              }
            };

            beforeEach(function () {
              originalCaches = globalThis.caches;
              cache = new Map();
              globalThis.caches = {
                open: async () => ({
                  match: async (key: string) => cache.get(key),
                  put: async (key: string, response: Response) => {
                    cache.set(key, response);
                  },
                  delete: async (key: string) => cache.delete(key),
                }),
              } as any;
            });

            afterEach(function () {
              globalThis.caches = originalCaches;
            });

            specify('should not reuse a file cached under another urlAllowList', async function () {
              await readStart([new HttpResolverAxios()]);
              await assertRedirectRejected([new HttpResolverAxios({ urlAllowList: [/\/start$/] })]);
            });

            specify(
              'should not reuse a file cached when an unrestricted resolver could read it',
              async function () {
                await readStart([
                  new HttpResolverAxios(),
                  new HttpResolverAxios({ urlAllowList: [/\/start$/] }),
                ]);
                await assertRedirectRejected([
                  new HttpResolverAxios({ urlAllowList: [/\/start$/] }),
                ]);
              },
            );

            specify(
              'should keep the cache key of files read without urlAllowList',
              async function () {
                await readStart([new HttpResolverAxios()]);
                await readStart([new HttpResolverAxios({ urlAllowList: [/^http:\/\/localhost/] })]);
                const keys = [...cache.keys()];

                assert.include(keys, `read_${origin}/start`);
                assert.isTrue(
                  keys.some((key) => key.startsWith('read_allow_')),
                  'a file read under urlAllowList has its own key prefix',
                );
              },
            );
          });

          specify('should apply urlAllowList passed per call via resolverOpts', async function () {
            try {
              await parse(`${origin}/doc.json`, {
                resolve: {
                  resolvers: [new HttpResolverAxios()],
                  resolverOpts: { urlAllowList: [] },
                },
              });
              assert.fail('should throw UnmatchedResolverError');
            } catch (error: any) {
              assert.instanceOf(error, UnmatchedResolverError);
            }
          });
        });
      });
    });
  });
});
