import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ChannelsElement from '../../../../elements/Channels';

const ChannelsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new ChannelsElement();
  },
});

export default ChannelsVisitor;
