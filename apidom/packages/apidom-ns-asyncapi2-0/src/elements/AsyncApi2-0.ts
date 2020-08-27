import { Attributes, Meta, ObjectElement } from 'minim';
import AsyncapiElement from './Asyncapi';
import IdentifierElement from './Identifier';
import ComponentsElement from './Components';
import InfoElement from './Info';

class AsyncApi2_0 extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi2-0';
    this.classes.push('api');
  }

  get asyncapi(): AsyncapiElement {
    return this.get('asyncapi');
  }

  get id(): IdentifierElement {
    return this.get('id');
  }

  get info(): InfoElement {
    return this.get('info');
  }

  get components(): ComponentsElement {
    return this.get('components');
  }
}

export default AsyncApi2_0;
