import stampit from 'stampit';

import ResolverError from '../../util/errors/ResolverError';
import { HttpResolver as IHttpResolver, File as IFile } from '../../types';
import HttpResolver from './HttpResolver';

interface IHttpResolverSwaggerClient extends IHttpResolver {
  swaggerHTTPClient: any;
  swaggerHTTPClientConfig: { [key: string]: any };

  getHttpClient(): any;
}

const HttpResolverSwaggerClient: stampit.Stamp<IHttpResolverSwaggerClient> = stampit(HttpResolver, {
  props: {
    name: 'http-swagger-client',
    swaggerHTTPClient: null,
    swaggerHTTPClientConfig: {},
  },
  init(this: IHttpResolverSwaggerClient, { swaggerHTTPClient = this.swaggerHTTPClient }) {
    this.swaggerHTTPClient = swaggerHTTPClient;
  },
  methods: {
    getHttpClient() {
      return this.swaggerHTTPClient;
    },
    async read(file: IFile): Promise<Buffer> {
      const client = this.getHttpClient();
      const controller = new AbortController();
      const { signal } = controller;
      const timeoutID = setTimeout(() => {
        controller.abort();
      }, this.timeout);
      const credentials =
        this.getHttpClient()?.withCredentials || this.withCredentials ? 'include' : 'same-origin';
      const redirects = this.redirects === 0 ? 'error' : 'follow';
      const follow = this.redirects > 0 ? this.redirects : undefined;

      try {
        const response = await client({
          url: file.uri,
          signal,
          userFetch: async (resource: string, options: any) => {
            const res = await fetch(resource, options);
            res.headers.delete('Content-Type');
            return res;
          },
          credentials,
          redirects,
          follow,
          ...this.swaggerHTTPClientConfig,
        });

        return response.text.arrayBuffer();
      } catch (error: any) {
        throw new ResolverError(`Error downloading "${file.uri}"`, error);
      } finally {
        clearTimeout(timeoutID);
      }
    },
  },
});

export default HttpResolverSwaggerClient;
