import stampit from 'stampit';
import { readFile } from 'fs';
import { promisify } from 'util';

import { Resolver as IResolver, File as IFile } from '../../types';
import Resolver from './Resolver';
import { isFileSystemPath, toFileSystemPath } from '../../util/url';
import { ResolverError } from '../../util/errors';

const FileResolver: stampit.Stamp<IResolver> = stampit(Resolver, {
  init() {
    this.name = 'file';
  },
  methods: {
    canRead(file: IFile): boolean {
      return isFileSystemPath(file.uri);
    },
    async read(file: IFile): Promise<Buffer> {
      const fileSystemPath = toFileSystemPath(file.uri);

      try {
        return await promisify(readFile)(fileSystemPath);
      } catch (error: any) {
        throw new ResolverError(`Error opening file "${file.uri}"`, error);
      }
    },
  },
});

export default FileResolver;
