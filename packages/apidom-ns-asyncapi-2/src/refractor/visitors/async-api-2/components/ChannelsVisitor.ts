import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsChannelsElement from '../../../../elements/nces/ComponentsChannels';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ChannelsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsChannelsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ChannelItem']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ComponentsChannelsElement();
    this.specPath = always(['document', 'objects', 'ChannelItem']);
  }
}

export default ChannelsVisitor;
