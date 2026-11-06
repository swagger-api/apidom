import { minimatch } from 'minimatch';

import Resolver, { ResolverOptions } from './Resolver.ts';
import * as url from '../../util/url.ts';
import File from '../../File.ts';

/**
 * @public
 */
export interface HTTPResolverOptions extends ResolverOptions {
  readonly timeout?: number;
  readonly redirects?: number;
  readonly withCredentials?: boolean;
  /**
   * Restricts which URLs the resolver may read. Each entry is a RegExp or a glob
   * (matched with minimatch, like `FileResolver.fileAllowList`). When undefined, any
   * http(s) URL may be read.
   */
  readonly urlAllowList?: Array<string | RegExp>;
}

/**
 * @public
 */
abstract class HTTPResolver extends Resolver {
  protected readonly timeout: number;

  protected readonly redirects: number;

  protected readonly withCredentials: boolean;

  public urlAllowList?: Array<string | RegExp>;

  constructor(options?: HTTPResolverOptions) {
    const {
      name = 'http-resolver',
      timeout = 5000,
      redirects = 5,
      withCredentials = false,
      urlAllowList,
    } = options ?? {};

    super({ name });
    this.timeout = timeout;
    this.redirects = redirects;
    this.withCredentials = withCredentials;
    this.urlAllowList = urlAllowList;
  }

  canRead(file: File): boolean {
    return url.isHttpUrl(file.uri) && this.isUrlAllowed(file.uri);
  }

  protected isUrlAllowed(uri: string): boolean {
    if (this.urlAllowList === undefined) {
      return true;
    }

    return this.urlAllowList.some((pattern) =>
      typeof pattern === 'string' ? minimatch(uri, pattern) : pattern.test(uri),
    );
  }

  abstract getHttpClient(): unknown;
}

export default HTTPResolver;
