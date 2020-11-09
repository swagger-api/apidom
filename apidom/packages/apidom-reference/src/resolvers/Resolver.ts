import stampit from 'stampit';

import { NotImplementedError } from '../util/errors';

interface Resolver {
  canRead(uri: string): boolean;
  read(uri: string): Promise<unknown>;
}

const Resolver: stampit.Stamp<Resolver> = stampit({
  methods: {
    canRead() {
      return false;
    },
    async read() {
      throw new NotImplementedError();
    },
  },
});

export default Resolver;
