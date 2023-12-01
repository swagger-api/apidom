import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import { BundleStrategy as IBundleStrategy } from '../../types';

const BundleStrategy: stampit.Stamp<IBundleStrategy> = stampit({
  props: {
    name: null,
  },
  methods: {
    canBundle() {
      return false;
    },

    async bundle(): Promise<never> {
      throw new NotImplementedError(
        'bundle method in BundleStrategy stamp is not yet implemented.',
      );
    },
  },
});

export default BundleStrategy;
