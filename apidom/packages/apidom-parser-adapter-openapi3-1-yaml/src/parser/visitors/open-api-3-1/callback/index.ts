import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../../generics';
import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';

const CallbackVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Callback']),
  },
  init() {
    this.element = new this.namespace.elements.Callback();
  },
});

export default CallbackVisitor;
