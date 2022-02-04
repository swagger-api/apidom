import stampit from 'stampit';
import { always } from 'ramda';

import ComponentsChannelsElement from '../../../../elements/nces/ComponentsChannels';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ChannelsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
  },
  init() {
    this.element = new ComponentsChannelsElement();
  },
});

export default ChannelsVisitor;
