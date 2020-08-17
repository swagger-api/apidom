import { Attributes, Meta, ObjectElement } from 'minim';
import OpenapiElement from './Openapi';
import InfoElement from './Info';
import ServerElement from './Server';
import ComponentsElement from './Components';

class OpenApi3_1 extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openApi3-1';
    this.classes.push('api');
    this.attributes.set('properties', ['openapi', 'info', 'servers', 'components']);
  }

  get openapi(): OpenapiElement {
    return this.get('openapi');
  }

  get info(): InfoElement {
    return this.get('info');
  }

  get servers(): ServerElement[] {
    return this.get('servers');
  }

  get components(): ComponentsElement {
    return this.get('components');
  }
}

export default OpenApi3_1;
