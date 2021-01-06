import { Attributes, Meta, ObjectElement } from 'minim';
import AsyncapiElement from './Asyncapi';
import IdentifierElement from './Identifier';
import ComponentsElement from './Components';
import InfoElement from './Info';
import ChannelsElement from './Channels';

class AsyncApi2_0 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi2_0';
    this.classes.push('api');
  }

  get asyncapi(): AsyncapiElement {
    return this.get('asyncapi');
  }

  set asyncapi(asyncapi: AsyncapiElement) {
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
}

export default AsyncApi2_0;
