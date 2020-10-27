import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const InfoVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Info']),
  },
  init() {
    this.element = new this.namespace.elements.Info();
  },
});

export default InfoVisitor;
