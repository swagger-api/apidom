import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { ServerVariableElement } from '@swagger-api/apidom-ns-openapi-3-0';

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

  get variables(): Record<string, ServerVariableElement> {
    return this.get('variables');
  }

  set variables(variables: Record<string, ServerVariableElement>) {
    this.set('variables', variables);
  }
}

export default Server;
