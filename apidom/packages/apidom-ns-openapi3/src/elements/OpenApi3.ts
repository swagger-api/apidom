import { Attributes, Meta, ObjectElement } from 'minim';
import OpenapiElement from './Openapi';
import InfoElement from './Info';

class OpenApi3 extends ObjectElement {
  constructor(content: Record<string, unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'openApi3';
    this.classes.push('api');
  }

  get openapi(): OpenapiElement {
    return this.get('openapi');
  }

  get info(): InfoElement {
    return this.get('info');
  }
}

export default OpenApi3;
