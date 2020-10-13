import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ComponentsVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Components']),
  },
  init() {
    this.element = new this.namespace.elements.Components();
  },
});

export default ComponentsVisitor;
