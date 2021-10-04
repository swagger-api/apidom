import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement, BooleanElement } from '@swagger-api/apidom-core';

class Xml extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'xml';
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get namespace(): StringElement {
    return this.get('namespace');
  }

  set namespace(namespace: StringElement) {
    this.set('namespace', namespace);
  }

  get prefix(): StringElement {
    return this.get('prefix');
  }

  set prefix(prefix: StringElement) {
    this.set('prefix', prefix);
  }

  get attribute(): BooleanElement {
    return this.get('attribute');
  }

  set attribute(attribute: BooleanElement) {
    this.set('attribute', attribute);
  }

  get wrapped(): BooleanElement {
    return this.get('wrapped');
  }

  set wrapped(wrapped: BooleanElement) {
    this.set('wrapped', wrapped);
  }
}

export default Xml;
