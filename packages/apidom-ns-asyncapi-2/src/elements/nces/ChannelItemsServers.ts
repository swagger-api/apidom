import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class ChannelItemServers extends ArrayElement {
  static primaryClass = 'channel-item-server-names-list';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ChannelItemServers.primaryClass);
  }
}

export default ChannelItemServers;
