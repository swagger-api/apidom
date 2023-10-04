import stampit from 'stampit';

import { Resolver as IResolver } from '../../../types';
import Resolver from '../Resolver';
import ResolverError from '../../../errors/ResolverError';

const FileResolver: stampit.Stamp<IResolver> = stampit(Resolver, {
  init() {
    this.name = 'file';
  },
  methods: {
    canRead(): boolean {
      return false;
    },
    async read(): Promise<Buffer> {
      throw new ResolverError('FileResolver is not intended to be used in browser context.');
    },
  },
});

export default FileResolver;
