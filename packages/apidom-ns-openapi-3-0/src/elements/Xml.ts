import {
  StringElement,
  ObjectElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class Xml extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'xml';
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get namespace(): StringElement | undefined {
    return this.get('namespace');
  }

  set namespace(namespace: StringElement | undefined) {
    this.set('namespace', namespace);
  }

  get prefix(): StringElement | undefined {
    return this.get('prefix');
  }

  set prefix(prefix: StringElement | undefined) {
    this.set('prefix', prefix);
  }

  get attribute(): BooleanElement | undefined {
    return this.get('attribute');
  }

  set attribute(attribute: BooleanElement | undefined) {
    this.set('attribute', attribute);
  }

  get wrapped(): BooleanElement | undefined {
    return this.get('wrapped');
  }

  set wrapped(wrapped: BooleanElement | undefined) {
    this.set('wrapped', wrapped);
  }
}

export default Xml;
