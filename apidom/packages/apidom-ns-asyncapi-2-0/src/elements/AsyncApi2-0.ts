import { Attributes, Meta, ObjectElement } from 'minim';

import AsyncApiVersionElement from './AsyncApiVersion';
import IdentifierElement from './Identifier';
import ComponentsElement from './Components';
import InfoElement from './Info';
import ChannelsElement from './Channels';
import ServersElement from './Servers';

class AsyncApi2_0 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi2_0';
    this.classes.push('api');
  }

  get asyncapi(): AsyncApiVersionElement {
    return this.get('asyncapi');
  }

  set asyncapi(asyncapi: AsyncApiVersionElement) {
    this.set('asyncapi', asyncapi);
  }

  get id(): IdentifierElement {
    return this.get('id');
  }

  set id(id: IdentifierElement) {
    this.set('id', id);
  }

  get info(): InfoElement {
    return this.get('info');
  }

  set info(info: InfoElement) {
    this.set('info', info);
  }

  get channels(): ChannelsElement {
    return this.get('channels');
  }

  set channels(channels: ChannelsElement) {
    this.set('channels', channels);
  }

  get components(): ComponentsElement {
    return this.get('components');
  }

  set components(components: ComponentsElement) {
    this.set('components', components);
  }

  get servers(): ServersElement {
    return this.get('servers');
  }

  set servers(servers: ServersElement) {
    this.set('servers', servers);
  }
}

export default AsyncApi2_0;
