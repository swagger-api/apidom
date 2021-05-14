import stampit from 'stampit';

import { DereferenceStrategy as IDereferenceStrategy } from '../../types';
import { NotImplementedError } from '../../util/errors';

const DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit({
  props: {
    name: null,
  },
  methods: {
    canDereference() {
      return false;
    },

    async dereference(): Promise<never> {
      throw new NotImplementedError();
    },
  },
});

export default DereferenceStrategy;
