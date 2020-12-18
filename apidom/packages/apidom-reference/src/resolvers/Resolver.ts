import stampit from 'stampit';

import { NotImplementedError } from '../util/errors';
import { Resolver as IResolver } from '../types';

const Resolver: stampit.Stamp<IResolver> = stampit({
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
