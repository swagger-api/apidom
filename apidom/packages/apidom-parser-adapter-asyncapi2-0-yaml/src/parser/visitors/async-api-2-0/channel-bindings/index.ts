import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../../generics';
import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';

const ChannelBindingsVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelBindings']),
  },
  init() {
    this.element = new this.namespace.elements.ChannelBindings();
  },
});

export default ChannelBindingsVisitor;
