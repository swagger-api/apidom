import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ChannelServers extends ArrayElement {
  static primaryClass = 'channel-servers';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ChannelServers.primaryClass);
  }
}

export default ChannelServers;
