import stampit from 'stampit';
import { always } from 'ramda';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ChannelsVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new this.namespace.elements.Channels();
  },
});

export default ChannelsVisitor;
