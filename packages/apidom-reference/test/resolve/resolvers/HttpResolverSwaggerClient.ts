import { Buffer } from 'node:buffer';
import http from 'node:http';
import path from 'node:path';
import { assert } from 'chai';
import sinon from 'sinon';
import { identity } from 'ramda';
// @ts-ignore
import SwaggerClient from 'swagger-client';

import HttpResolverSwaggerClient from '../../../src/resolve/resolvers/http-swagger-client';
import { ResolverError } from '../../../src/util/errors';
import File from '../../../src/util/File';
import { createHTTPServer } from '../../helpers';

describe('resolve', function () {
  context('resolvers', function () {
    context('HttpResolverSwaggerClient', function () {
      let resolver: any;

      beforeEach(function () {
        resolver = HttpResolverSwaggerClient({ swaggerHTTPClient: SwaggerClient.http });
      });

      context('canRead', function () {
        context('given valid http URL', function () {
          specify('should consider it a HTTP URL', function () {
            assert.isTrue(resolver.canRead(File({ uri: 'http://swagger.io/file.txt' })));
          });
        });

        context('given valid https URL', function () {
          specify('should consider it a https URL', function () {
            assert.isTrue(resolver.canRead(File({ uri: 'https://swagger.io/file.txt' })));
          });
        });

        context('given URIs with no protocol', function () {
          specify('should not consider it a http/https URL', function () {
            assert.isFalse(resolver.canRead(File({ uri: '/home/user/file.txt' })));
            assert.isFalse(resolver.canRead(File({ uri: 'C:\\home\\user\\file.txt' })));
          });
        });

        context('given URLs with other known protocols', function () {
          specify('should not consider it a http/https URL', function () {
            assert.isFalse(resolver.canRead(File({ uri: 'ftp://swagger.io/' })));
          });
        });
      });

      context('read', function () {
        context('given HTTP URL', function () {
          specify('should fetch the URL', async function () {
            const url = 'https://httpbin.org/anything';
            const response = new Response(Buffer.from('data'));
            const fetchStub = sinon.stub(globalThis, 'fetch');

            fetchStub.returns(Promise.resolve(response));
            const content = await resolver.read(File({ uri: url }));

            assert.instanceOf(content, ArrayBuffer);
            assert.strictEqual(Buffer.from(content).toString(), 'data');

            fetchStub.restore();
          });

          specify('should throw on unexpected status codes', async function () {
            const url = 'https://httpbin.org/anything';
            const response = new Response(Buffer.from('data'), {
              status: 400,
            });
            const fetchStub = sinon.stub(globalThis, 'fetch');

            try {
              fetchStub.returns(Promise.resolve(response));
              await resolver.read(File({ uri: url }));
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.instanceOf(e, ResolverError);
              assert.propertyVal(e, 'message', 'Error downloading "https://httpbin.org/anything"');
            } finally {
              fetchStub.restore();
            }
          });

          specify('should throw on timeout', async function () {
            resolver = HttpResolverSwaggerClient({
              swaggerHTTPClient: SwaggerClient.http,
              timeout: 1,
            });
            const url = 'http://localhost:8123/local-file.txt';
            const cwd = path.join(__dirname, 'fixtures');
            const server = createHTTPServer({ port: 8123, cwd });

            try {
              await resolver.read(File({ uri: url }));
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.strictEqual(error.cause.message, 'The user aborted a request.');
              assert.instanceOf(error, ResolverError);
              assert.propertyVal(
                error,
                'message',
                'Error downloading "http://localhost:8123/local-file.txt"',
              );
            } finally {
              await server.terminate();
            }
          });

          context('given withCredentials option', function () {
            specify('should allow cross-site Access-Control requests', async function () {
              resolver = HttpResolverSwaggerClient({
                swaggerHTTPClient: SwaggerClient.http,
                withCredentials: true,
              });
              const url = 'https://httpbin.org/anything';
              const response = new Response(Buffer.from('data'));
              const fetchStub = sinon.stub(globalThis, 'fetch');

              try {
                fetchStub.returns(Promise.resolve(response));
                await resolver.read(File({ uri: url }));
                assert.strictEqual(fetchStub.firstCall.args[1]?.credentials, 'include');
              } finally {
                fetchStub.restore();
              }
            });
          });

          context('given global withCredentials override', function () {
            specify('should allow cross-site Access-Control requests', async function () {
              const url = 'https://httpbin.org/anything';
              const response = new Response(Buffer.from('data'));
              const fetchStub = sinon.stub(globalThis, 'fetch');
              const { withCredentials: originalWithCredentials } = SwaggerClient.http;

              SwaggerClient.http.withCredentials = true;

              try {
                fetchStub.returns(Promise.resolve(response));
                await resolver.read(File({ uri: url }));
                assert.strictEqual(fetchStub.firstCall.args[1]?.credentials, 'include');
              } finally {
                fetchStub.restore();
                SwaggerClient.http.withCredentials = originalWithCredentials;
              }
            });
          });

          context('given redirects options', function () {
            specify('should throw on exceeding redirects', function (done) {
              resolver = HttpResolverSwaggerClient({
                swaggerHTTPClient: SwaggerClient.http,
                redirects: 0,
              });
              const url = 'http://localhost:4444/';
              const server = http.createServer((req, res) => {
                res.setHeader('Location', '/foo');
                res.statusCode = 302;
                res.end();
              });

              server.listen(4444, () => {
                resolver
                  .read(File({ uri: url }))
                  .catch((error: any) => {
                    assert.instanceOf(error, ResolverError);
                    assert.strictEqual(
                      error.cause.message,
                      'maximum redirect reached at: http://localhost:4444/foo',
                    );
                  })
                  .catch(identity)
                  .then((error: any) => {
                    server.close();
                    done(error);
                  });
              });
            });
          });
        });
      });
    });
  });
});
