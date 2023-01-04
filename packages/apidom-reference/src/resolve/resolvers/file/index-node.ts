import { readFile } from '#fs'; // eslint-disable-line import/order
import { promisify } from '#util'; // eslint-disable-line import/order
import stampit from 'stampit';
import minimatch from 'minimatch';

import { FileResolver as IFileResolver, File as IFile } from '../../../types';
import Resolver from '../Resolver';
import * as url from '../../../util/url';
import { ResolverError } from '../../../util/errors';

const FileResolver: stampit.Stamp<IFileResolver> = stampit(Resolver, {
  props: {
    name: 'file',
    fileAllowList: [],
  },
  init(this: IFileResolver, { fileAllowList = this.fileAllowList }) {
    this.fileAllowList = fileAllowList;
  },
  methods: {
    canRead(this: IFileResolver, file: IFile): boolean {
      return (
        url.isFileSystemPath(file.uri) &&
        this.fileAllowList.some((pattern) => {
          return typeof pattern === 'string'
            ? minimatch(file.uri, pattern, { matchBase: true })
            : pattern.test(file.uri);
        })
      );
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
