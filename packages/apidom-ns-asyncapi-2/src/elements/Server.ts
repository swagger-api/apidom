import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import ServerBindingsElement from './ServerBindings';

class Server extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

  get url(): StringElement | undefined {
    return this.get('url');
  }

  set url(url: StringElement | undefined) {
    this.set('url', url);
  }

  get protocol(): StringElement | undefined {
    return this.get('protocol');
  }

  set protocol(protocol: StringElement | undefined) {
    this.set('protocol', protocol);
  }

  get protocolVersion(): StringElement | undefined {
    return this.get('protocolVersion');
  }

  set protocolVersion(protocolVersion: StringElement | undefined) {
    this.set('protocolVersion', protocolVersion);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get variables(): ObjectElement | undefined {
    return this.get('variables');
  }

  set variables(variables: ObjectElement | undefined) {
    this.set('variables', variables);
  }

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }

  get bindings(): ServerBindingsElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: ServerBindingsElement | undefined) {
    this.set('bindings', bindings);
  }
}

export default Server;
