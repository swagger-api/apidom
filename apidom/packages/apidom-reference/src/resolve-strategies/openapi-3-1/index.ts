import stampit from 'stampit';

import { ComposableResolveStrategy as IComposableResolveStrategy } from '../../types';
import ReferenceObjectsResolveStrategy from './reference-objects';
import ComposableResolveStrategy from '../ComposableResolveStrategy';

const OpenApi3_1ResolveStrategy: stampit.Stamp<IComposableResolveStrategy> = stampit(
  ComposableResolveStrategy,
  {
    init() {
      this.composeStrategies = [ReferenceObjectsResolveStrategy()];
    },
  },
);

export default OpenApi3_1ResolveStrategy;
