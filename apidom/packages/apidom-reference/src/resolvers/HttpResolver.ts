import stampit from 'stampit';

import Resolver from './Resolver';
import { isHttpUrl } from '../util/url';
import NotImplementedError from '../util/errors/NotImplementedError';
import File from '../util/File';

interface HttpResolverConstructorParameters {
  timeout?: number;
  redirects?: number;
  withCredentials?: boolean;
}

interface HttpResolver extends Resolver {
  timeout: number;
  redirects: number;
  withCredentials: boolean;

  getHttpClient(): unknown;
}

const HttpResolver: stampit.Stamp<HttpResolver> = stampit(Resolver, {
  props: {
    timeout: 5000,
    redirects: 5,
    withCredentials: false,
  },
  init(
    this: HttpResolver,
    {
      timeout = this.timeout,
      redirects = this.redirects,
      withCredentials = this.withCredentials,
    }: HttpResolverConstructorParameters = {},
  ) {
    this.type = 'http';
    this.timeout = timeout;
    this.redirects = redirects;
    this.withCredentials = withCredentials;
  },
  methods: {
    canRead(file: File): boolean {
      return isHttpUrl(file.uri);
    },

    async read(): Promise<never> {
      throw new NotImplementedError();
    },

    getHttpClient(): unknown {
      throw new NotImplementedError();
    },
  },
});

export default HttpResolver;
