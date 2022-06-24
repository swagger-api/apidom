import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ServerVariable extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverVariable';
  }

  get enum(): StringElement[] {
    return this.get('enum');
  }

  set enum(value: StringElement[]) {
    this.set('enum', value);
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

  get examples(): StringElement[] {
    return this.get('examples');
  }

  set examples(examples: StringElement[]) {
    this.set('examples', examples);
  }
}

export default ServerVariable;
