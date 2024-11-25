import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import AsyncApiVersionElement from './AsyncApiVersion.ts';
import DefaultContentTypeElement from './DefaultContentType.ts';
import IdentifierElement from './Identifier.ts';
import ComponentsElement from './Components.ts';
import InfoElement from './Info.ts';
import ChannelsElement from './Channels.ts';
import ServersElement from './Servers.ts';
import TagsElement from './Tags.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';

/**
 * @public
 */
class AsyncApi2 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi2';
    this.classes.push('api');
  }

  get asyncapi(): AsyncApiVersionElement | undefined {
    return this.get('asyncapi');
  }

  set asyncapi(asyncapi: AsyncApiVersionElement | undefined) {
    this.set('asyncapi', asyncapi);
  }

  get idProp(): IdentifierElement | undefined {
    return this.get('id');
  }

  set idProp(id: IdentifierElement | undefined) {
    this.set('id', id);
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

  get components(): ComponentsElement | undefined {
    return this.get('components');
  }

  set components(components: ComponentsElement | undefined) {
    this.set('components', components);
  }

  get tags(): TagsElement | undefined {
    return this.get('tags');
  }

  set tags(tags: TagsElement | undefined) {
    this.set('tags', tags);
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    this.set('externalDocs', externalDocs);
  }
}

export default AsyncApi2;
