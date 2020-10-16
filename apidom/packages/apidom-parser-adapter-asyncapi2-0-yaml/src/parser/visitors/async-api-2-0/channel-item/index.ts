import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../../generics';
import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';

const ChannelItemVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new this.namespace.elements.ChannelItem();
  },
});

export default ChannelItemVisitor;
