import stampit from 'stampit';
import { readFile } from 'fs';
import { promisify } from 'util';

import Resolver from './Resolver';
import { isFileSystemPath, toFileSystemPath } from '../util/url';
import { ResolverError } from '../util/errors';
import File from '../util/File';

const FileResolver: stampit.Stamp<Resolver> = stampit(Resolver, {
  methods: {
    canRead(file: File): boolean {
      return isFileSystemPath(file.url);
    },
    async read(file: File): Promise<Buffer> {
      const fileSystemPath = toFileSystemPath({}, file.url);

      try {
        return await promisify(readFile)(fileSystemPath);
      } catch (e) {
        throw new ResolverError(`Error opening file "${file.url}"`, e);
      }
    },
  },
});

export default FileResolver;
