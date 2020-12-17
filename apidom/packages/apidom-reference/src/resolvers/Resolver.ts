import stampit from 'stampit';

import { NotImplementedError } from '../util/errors';
import File from '../util/File';

interface Resolver {
  type: string;

  canRead(file: File): boolean;
  read(file: File): Promise<Buffer>;
}

const Resolver: stampit.Stamp<Resolver> = stampit({
  props: {
    type: null,
  },
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
