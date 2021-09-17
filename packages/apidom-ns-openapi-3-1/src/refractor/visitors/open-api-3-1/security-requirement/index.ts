import stampit from 'stampit';
import { always } from 'ramda';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SecurityRequirementVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new SecurityRequirementElement();
  },
});

export default SecurityRequirementVisitor;
