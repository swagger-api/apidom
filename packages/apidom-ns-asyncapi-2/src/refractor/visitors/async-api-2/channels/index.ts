import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ChannelsElement from '../../../../elements/Channels.ts';

/**
 * @public
 */
export interface ChannelsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ChannelsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ChannelItem']>;

  constructor(options: ChannelsVisitorOptions) {
    super(options);
    this.element = new ChannelsElement();
    this.specPath = always(['document', 'objects', 'ChannelItem']);
  }
}

export default ChannelsVisitor;
