import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import { DereferenceStrategy as IDereferenceStrategy } from '../../types';

const DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit({
  props: {
    name: null,
  },
  methods: {
    canDereference() {
      return false;
    },

    async dereference(): Promise<never> {
      throw new NotImplementedError(
        'dereference method in DereferenceStrategy stamp is not yet implemented.',
      );
    },
  },
});

export default DereferenceStrategy;
