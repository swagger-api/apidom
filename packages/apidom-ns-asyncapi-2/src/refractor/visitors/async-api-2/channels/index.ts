import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import ChannelsElement from '../../../../elements/Channels';

export interface ChannelsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ChannelsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ChannelsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ChannelItem']>;

  constructor(options: ChannelsVisitorOptions) {
    super(options);
    this.element = new ChannelsElement();
    this.specPath = always(['document', 'objects', 'ChannelItem']);
  }
}

export default ChannelsVisitor;
