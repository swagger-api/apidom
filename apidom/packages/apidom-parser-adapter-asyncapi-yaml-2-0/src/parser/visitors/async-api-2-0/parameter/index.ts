import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ParameterVisitor = stampit(KindVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
  },
  init() {
    this.element = new this.namespace.elements.Parameter();
  },
});

export default ParameterVisitor;
