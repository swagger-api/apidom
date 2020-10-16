import stampit from 'stampit';
import { always } from 'ramda';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ChannelsVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new this.namespace.elements.Channels();
  },
});

export default ChannelsVisitor;
