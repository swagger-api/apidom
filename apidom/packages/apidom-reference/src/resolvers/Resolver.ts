import stampit from 'stampit';

import { NotImplementedError } from '../util/errors';

interface Resolver {
  canRead(uri: string): boolean;
  read(uri: string): Promise<Buffer>;
}

const Resolver: stampit.Stamp<Resolver> = stampit({
  methods: {
    canRead() {
      return false;
    },
    async read(): Promise<never> {
      throw new NotImplementedError();
    },
  },
});

export default Resolver;
