import stampit from 'stampit';
import { always } from 'ramda';

import ScenarioElement from '../../../../elements/Scenario';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ScenarioVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Scenario']),
  },
  init() {
    this.element = new ScenarioElement();
  },
});

export default ScenarioVisitor;
