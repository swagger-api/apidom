import stampit from 'stampit';
import { readFile } from 'fs';
import { promisify } from 'util';

import Resolver from './Resolver';
import { isFileSystemPath, toFileSystemPath } from '../util/url';
import { ResolverError } from '../util/errors';

const FileResolver: stampit.Stamp<Resolver> = stampit(Resolver, {
  methods: {
    canRead(uri: string): boolean {
      return isFileSystemPath(uri);
    },
    async read(uri: string): Promise<Buffer> {
      const fileSystemPath = toFileSystemPath({}, uri);

      try {
        return await promisify(readFile)(fileSystemPath);
      } catch (e) {
        throw new ResolverError(`Error opening file "${uri}"`, e);
      }
    },
  },
});

export default FileResolver;
