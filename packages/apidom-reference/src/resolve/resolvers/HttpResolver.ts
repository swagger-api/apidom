import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import Resolver from './Resolver';
import * as url from '../../util/url';
import { HttpResolver as IHttpResolver } from '../../types';
import File from '../../File';

interface HttpResolverConstructorParameters {
  timeout?: number;
  redirects?: number;
  withCredentials?: boolean;
}

const HttpResolver: stampit.Stamp<IHttpResolver> = stampit(Resolver, {
  props: {
    timeout: 5000,
    redirects: 5,
    withCredentials: false,
  },
  init(
    this: IHttpResolver,
    {
      timeout = this.timeout,
      redirects = this.redirects,
      withCredentials = this.withCredentials,
    }: HttpResolverConstructorParameters = {},
  ) {
    this.timeout = timeout;
    this.redirects = redirects;
    this.withCredentials = withCredentials;
  },
  methods: {
    canRead(file: File): boolean {
      return url.isHttpUrl(file.uri);
    },

    async read(): Promise<never> {
      throw new NotImplementedError('read method in HttpResolver stamp is not yet implemented.');
    },

    getHttpClient(): unknown {
      throw new NotImplementedError(
        'getHttpClient method in HttpResolver stamp is not yet implemented.',
      );
    },
  },
});

export default HttpResolver;
