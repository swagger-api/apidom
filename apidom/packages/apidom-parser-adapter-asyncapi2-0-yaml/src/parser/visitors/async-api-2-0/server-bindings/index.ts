import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ServerBindingsVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerBindings']),
  },
  init() {
    this.element = new this.namespace.elements.ServerBindings();
  },
});

export default ServerBindingsVisitor;
