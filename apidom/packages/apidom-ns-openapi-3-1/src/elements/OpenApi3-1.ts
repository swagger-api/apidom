import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement } from 'apidom';

import OpenapiElement from './Openapi';
import InfoElement from './Info';
import ServerElement from './Server';
import ComponentsElement from './Components';

class OpenApi3_1 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openApi3_1';
    this.classes.push('api');
  }

  get openapi(): OpenapiElement {
    return this.get('openapi');
  }

  get info(): InfoElement {
    return this.get('info');
  }

  get jsonSchemaDialect(): StringElement {
    return this.get('jsonSchemaDialect');
  }

  get servers(): ServerElement[] {
    return this.get('servers');
  }

  get components(): ComponentsElement {
    return this.get('components');
  }
}

export default OpenApi3_1;
