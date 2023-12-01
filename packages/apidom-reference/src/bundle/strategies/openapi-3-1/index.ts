import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import BundleStrategy from '../BundleStrategy';
import { BundleStrategy as IBundleStrategy } from '../../../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1BundleStrategy: stampit.Stamp<IBundleStrategy> = stampit(BundleStrategy, {
  init() {
    this.name = 'openapi-3-1';
  },
  methods: {
    canBundle(): boolean {
      return false;
    },

    async bundle(): Promise<void> {
      throw new NotImplementedError(
        'bundle method in OpenApi3_1BundleStrategy stamp is not yet implemented.',
      );
    },
  },
});

export default OpenApi3_1BundleStrategy;
