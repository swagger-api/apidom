import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ServerVariableVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.ServerVariable();
  },
});

export default ServerVariableVisitor;
