import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ComponentsVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Components']),
  },
  init() {
    this.element = new this.namespace.elements.Components();
  },
});

export default ComponentsVisitor;
