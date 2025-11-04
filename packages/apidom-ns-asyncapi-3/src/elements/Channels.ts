import { Attributes, Meta, StringElement } from '@swagger-api/apidom-core';
import { ChannelsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import ChannelElement from './Channel.ts';

/**
 * @public
 */
class Channels extends ChannelsElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channels';
  }

  get channel(): ChannelElement | undefined {
    return this.get('channel');
  }

  set channel(channel: ChannelElement | undefined) {
    this.set('channel', channel);
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }
}

export default Channels;
