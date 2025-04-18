import { readFile } from '#fs'; // eslint-disable-line import/order
import { promisify } from '#util'; // eslint-disable-line import/order
import minimatch from 'minimatch';

import File from '../../../File.ts';
import Resolver, { ResolverOptions } from '../Resolver.ts';
import * as url from '../../../util/url.ts';
import ResolverError from '../../../errors/ResolverError.ts';

export type { default as Resolver, ResolverOptions } from '../Resolver.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface FileResolverOptions extends Omit<ResolverOptions, 'name'> {
  readonly fileAllowList?: string[] | RegExp[];
}

/**
 * @public
 */
class FileResolver extends Resolver {
  public fileAllowList: string[] | RegExp[];

  constructor(options?: FileResolverOptions) {
    const { fileAllowList = [] } = options ?? {};

    super({ name: 'file' });
    this.fileAllowList = fileAllowList;
  }

  canRead(file: File): boolean {
    return (
      url.isFileSystemPath(file.uri) &&
      this.fileAllowList.some((pattern) => {
        return typeof pattern === 'string'
          ? minimatch(file.uri, pattern, { matchBase: true })
          : pattern.test(file.uri);
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async read(file: File): Promise<Buffer> {
    const fileSystemPath = url.toFileSystemPath(file.uri);

    try {
      return await promisify(readFile)(fileSystemPath);
    } catch (error: unknown) {
      throw new ResolverError(`Error opening file "${file.uri}"`, { cause: error });
    }
  }
}

export default FileResolver;
