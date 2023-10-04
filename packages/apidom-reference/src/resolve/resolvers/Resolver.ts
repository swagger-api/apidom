import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import { Resolver as IResolver } from '../../types';

const Resolver: stampit.Stamp<IResolver> = stampit({
  props: {
    name: null,
  },
  methods: {
    canRead() {
      return false;
    },
    async read(): Promise<never> {
      throw new NotImplementedError('read method in Resolver stamp is not yet implemented.');
    },
  },
});

export default Resolver;
