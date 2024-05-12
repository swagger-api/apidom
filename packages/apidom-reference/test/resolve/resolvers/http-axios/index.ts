import { Buffer } from 'node:buffer';
import http from 'node:http';
import { assert } from 'chai';
import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { identity } from 'ramda';

import HttpResolverAxios from '../../../../src/resolve/resolvers/http-axios';
import ResolverError from '../../../../src/errors/ResolverError';
import File from '../../../../src/File';

describe('resolve', function () {
  context('resolvers', function () {
    context('HttpResolverAxios', function () {
      let resolver: any;

      beforeEach(function () {
        resolver = new HttpResolverAxios();
      });

      context('canRead', function () {
        context('given valid http URL', function () {
          specify('should consider it a HTTP URL', function () {
            assert.isTrue(resolver.canRead(new File({ uri: 'http://swagger.io/file.txt' })));
          });
        });

        context('given valid https URL', function () {
          specify('should consider it a https URL', function () {
            assert.isTrue(resolver.canRead(new File({ uri: 'https://swagger.io/file.txt' })));
          });
        });

        context('given URIs with no protocol', function () {
          specify('should not consider it a http/https URL', function () {
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
            assert.isFalse(resolver.canRead(new File({ uri: 'C:\\home\\user\\file.txt' })));
          });
        });

        context('given URLs with other known protocols', function () {
          specify('should not consider it a http/https URL', function () {
            assert.isFalse(resolver.canRead(new File({ uri: 'ftp://swagger.io/' })));
          });
        });
      });

      context('read', function () {
        let axiosInstance: any;
        let axiosMock: any;

        beforeEach(function () {
          axiosInstance = resolver.getHttpClient();
          axiosMock = new MockAdapter(axiosInstance);
        });

        context('given HTTP URL', function () {
          specify('should fetch the URL', async function () {
            const url = 'https://httpbin.org/anything';

            axiosMock.onGet(url).reply(200, Buffer.from('data'));
            const content = await resolver.read(new File({ uri: url }));

            assert.isTrue(ArrayBuffer.isView(content));
            assert.strictEqual(content.toString(), 'data');
          });

          specify('should throw on unexpected status codes', async function () {
            const url = 'https://httpbin.org/anything';

            axiosMock.onGet(url).reply(400, Buffer.from('data'));

            try {
              await resolver.read(new File({ uri: url }));
              assert.fail('should throw ResolverError');
            } catch (e) {
              assert.instanceOf(e, ResolverError);
              assert.propertyVal(e, 'message', 'Error downloading "https://httpbin.org/anything"');
            }
          });

          specify('should throw on timeout', async function () {
            resolver = new HttpResolverAxios({ timeout: 1 });
            axiosInstance = resolver.getHttpClient();
            axiosMock = new MockAdapter(resolver.getHttpClient());
            const url = 'https://httpbin.org/anything';

            axiosMock.onGet(url).timeout();

            try {
              await resolver.read(new File({ uri: url }));
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.strictEqual(error.cause.message, 'timeout of 1ms exceeded');
              assert.instanceOf(error, ResolverError);
              assert.propertyVal(
                error,
                'message',
                'Error downloading "https://httpbin.org/anything"',
              );
            }
          });

          specify('should throw on network error', async function () {
            const url = 'https://httpbin.org/anything';

            axiosMock.onGet(url).networkError();

            try {
              await resolver.read(new File({ uri: url }));
              assert.fail('should throw ResolverError');
            } catch (error: any) {
              assert.strictEqual(error.cause.message, 'Network Error');
              assert.instanceOf(error, ResolverError);
              assert.propertyVal(
                error,
                'message',
                'Error downloading "https://httpbin.org/anything"',
              );
            }
          });

          context('given withCredentials option', function () {
            specify('should allow cross-site Access-Control requests', async function () {
              resolver = new HttpResolverAxios({ withCredentials: true });
              axiosInstance = resolver.getHttpClient();
              axiosMock = new MockAdapter(axiosInstance);
              const url = 'https://httpbin.org/anything';

              axiosMock.onGet(url).reply((config: AxiosRequestConfig) => {
                assert.isTrue(config.withCredentials);
                return [200, Buffer.from('data')];
              });
              await resolver.read(new File({ uri: url }));
            });
          });

          context('given redirects options', function () {
            specify('should throw on exceeding redirects', function (done) {
              resolver = new HttpResolverAxios({ redirects: 0 });
              axiosInstance = resolver.getHttpClient();
              const server = http.createServer((req, res) => {
                res.setHeader('Location', '/foo');
                res.statusCode = 302;
                res.end();
              });

              server.listen(4444, () => {
                axiosInstance
                  .get('http://localhost:4444/')
                  .catch((error: any) => {
                    assert.strictEqual(error.response.status, 302);
                    assert.strictEqual(error.response.headers.location, '/foo');
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
