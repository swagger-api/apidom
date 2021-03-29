import stampit from 'stampit';

import { ResolveStrategy as IResolveStrategy } from '../../types';
import { NotImplementedError } from '../../util/errors';

const ResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit({
  methods: {
    canResolve() {
      return false;
    },
    async resolve(): Promise<never> {
      throw new NotImplementedError();
    },
  },
});

export default ResolveStrategy;
