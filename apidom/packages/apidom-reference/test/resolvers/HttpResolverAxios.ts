import http from 'http';
import { assert } from 'chai';
import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import HttpResolverAxios from '../../src/resolvers/HttpResolverAxios';
import { ResolverError } from '../../src/util/errors';
import File from '../../src/util/File';

describe('resolvers', function () {
  context('HttpResolverAxios', function () {
    let resolver: any;

    beforeEach(function () {
      resolver = HttpResolverAxios();
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
          const content = await resolver.read(File({ uri: url }));

          assert.instanceOf(content, Buffer);
          assert.strictEqual(content.toString(), 'data');
        });

        specify('should throw on unexpected status codes', async function () {
          const url = 'https://httpbin.org/anything';

          axiosMock.onGet(url).reply(400, Buffer.from('data'));

          try {
            await resolver.read(File({ uri: url }));
            assert.fail('should throw ResolverError');
          } catch (e) {
            assert.instanceOf(e, ResolverError);
            assert.propertyVal(e, 'message', 'Error downloading "https://httpbin.org/anything"');
          }
        });

        specify('should throw on timeout', async function () {
          resolver = HttpResolverAxios({ timeout: 1 });
          const url = 'https://httpbin.org/anything';

          axiosMock.onGet(url).timeout();

          try {
            await resolver.read(File({ uri: url }));
            assert.fail('should throw ResolverError');
          } catch (e) {
            assert.strictEqual(e.cause.message, 'timeout of 1ms exceeded');
            assert.instanceOf(e, ResolverError);
            assert.propertyVal(e, 'message', 'Error downloading "https://httpbin.org/anything"');
          }
        });

        specify('should throw on network error', async function () {
          const url = 'https://httpbin.org/anything';

          axiosMock.onGet(url).networkError();

          try {
            await resolver.read(File({ uri: url }));
            assert.fail('should throw ResolverError');
          } catch (e) {
            assert.strictEqual(e.cause.message, 'Network Error');
            assert.instanceOf(e, ResolverError);
            assert.propertyVal(e, 'message', 'Error downloading "https://httpbin.org/anything"');
          }
        });

        context('given withCredentials option', function () {
          specify('should allow cross-site Access-Control requests', function (done) {
            resolver = HttpResolverAxios({ withCredentials: true });
            axiosInstance = resolver.getHttpClient();
            axiosMock = new MockAdapter(axiosInstance);
            const url = 'https://httpbin.org/anything';

            axiosMock.onGet(url).reply((config: AxiosRequestConfig) => {
              assert.isTrue(config.withCredentials);
              done();
              return [200];
            });
            resolver.read(File({ uri: url }));
          });
        });

        context('given redirects options', function () {
          specify('should throw on exceeding redirects', function (done) {
            resolver = HttpResolverAxios({ redirects: 0 });
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
                .then(() => {
                  server.close();
                  done();
                });
            });
          });
        });
      });
    });
  });
});
