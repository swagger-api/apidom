import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

import ServerVariable from './ServerVariable';

class Server extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

  get url(): StringElement {
    return this.get('url');
  }

  set url(url: StringElement) {
    this.set('url', url);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get variables(): Record<string, ServerVariable> {
    return this.get('variables');
  }

  set variables(variables: Record<string, ServerVariable>) {
    this.set('variables', variables);
  }
}

export default Server;
