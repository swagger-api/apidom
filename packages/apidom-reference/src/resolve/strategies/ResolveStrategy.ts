import stampit from 'stampit';
import { NotImplementedError } from '@swagger-api/apidom-error';

import { ResolveStrategy as IResolveStrategy } from '../../types';

const ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit({
  props: {
    name: null,
  },
  methods: {
    canResolve() {
      return false;
    },
    async resolve(): Promise<never> {
      throw new NotImplementedError(
        'resolve method in ResolveStrategy stamp is not yet implemented.',
      );
    },
  },
});

export default ResolveStrategy;
