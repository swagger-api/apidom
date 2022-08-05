import { readFile } from 'node:fs';
import { promisify } from 'node:util';
import stampit from 'stampit';

import { Resolver as IResolver, File as IFile } from '../../../types';
import Resolver from '../Resolver';
import * as url from '../../../util/url';
import { ResolverError } from '../../../util/errors';

const FileResolver: stampit.Stamp<IResolver> = stampit(Resolver, {
  init() {
    this.name = 'file';
  },
  methods: {
    canRead(file: IFile): boolean {
      return url.isFileSystemPath(file.uri);
    },
    async read(file: IFile): Promise<Buffer> {
      const fileSystemPath = url.toFileSystemPath(file.uri);

      try {
        return await promisify(readFile)(fileSystemPath);
      } catch (error: any) {
        throw new ResolverError(`Error opening file "${file.uri}"`, error);
      }
    },
  },
});

export default FileResolver;
