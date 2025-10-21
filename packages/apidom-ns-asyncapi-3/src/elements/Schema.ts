import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';
import AsyncApi3Element from './AsyncApi3.ts';
import ComponentsElement from './Components.ts';
import ChannelsElement from './Channels.ts';
import DefaultContentTypeElement from './DefaultContentType.ts';
import InfoElement from './Info.ts';
import OperationsElement from './Operations.ts';
import ServersElement from './Servers.ts';


/**
 * @public
 */
class Schema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
  }
 
  get asyncapi(): AsyncApi3Element | undefined {
    return this.get('asyncapi');
  }

  set asyncapi(asyncapi: AsyncApi3Element | undefined) {
    this.set('asyncapi', asyncapi);
  }

  get idProp(): string | undefined {
    return this.get('idProp');
  }

  set idProp(idProp: string | undefined) {
    this.set('idProp', idProp);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get servers(): ServersElement | undefined {
    return this.get('servers');
  }

  set servers(servers: ServersElement | undefined) {
    this.set('servers', servers);
  }

  get defaultContentType(): DefaultContentTypeElement | undefined {
    return this.get('defaultContentType');
  }

  set defaultContentType(defaultContentType: DefaultContentTypeElement | undefined) {
    this.set('defaultContentType', defaultContentType);
  }

  get channels(): ChannelsElement | undefined {
    return this.get('channels');
  }

  set channels(channels: ChannelsElement | undefined) {
    this.set('channels', channels);
  }

  get operations(): OperationsElement | undefined {
    return this.get('operations');
  }
  
  set operations(operations: OperationsElement | undefined) {
    this.set('operations', operations);
  }

  get components(): ComponentsElement | undefined {
    return this.get('components');
  }

  set components(components: ComponentsElement | undefined) {
    this.set('components', components);
  }
}

export default Schema;
