import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';

const ChannelsVisitor = stampit(MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new this.namespace.elements.Channels();
  },
});

export default ChannelsVisitor;
