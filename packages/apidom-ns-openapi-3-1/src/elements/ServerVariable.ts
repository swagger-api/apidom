import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class ServerVariable extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverVariable';
  }

  get default(): StringElement {
    return this.get('default');
  }

  set default(value: StringElement) {
    this.set('default', value);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get enum(): ArrayElement {
    return this.get('enum');
  }

  set enum(value: ArrayElement) {
    this.set('enum', value);
  }
}

export default ServerVariable;
