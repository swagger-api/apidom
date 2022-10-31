import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class ServerVariable extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverVariable';
  }

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  set enum(value: ArrayElement | undefined) {
    this.set('enum', value);
  }

  get default(): StringElement | undefined {
    return this.get('default');
  }

  set default(value: StringElement | undefined) {
    this.set('default', value);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ArrayElement | undefined) {
    this.set('examples', examples);
  }
}

export default ServerVariable;
