import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ComponentsVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Components']),
  },
  init() {
    this.element = new this.namespace.elements.Components();
  },
});

export default ComponentsVisitor;
