import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../../generics';
import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';

const ParameterVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
  },
  init() {
    this.element = new this.namespace.elements.Parameter();
  },
});

export default ParameterVisitor;
