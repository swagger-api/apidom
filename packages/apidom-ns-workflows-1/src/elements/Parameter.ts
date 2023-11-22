import { ObjectElement, StringElement, Element, Attributes, Meta } from '@swagger-api/apidom-core';

class Parameter extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get in(): StringElement | undefined {
    return this.get('in');
  }

  set in(val: StringElement | undefined) {
    this.set('in', val);
  }

  get style(): StringElement | undefined {
    return this.get('style');
  }

  set style(style: StringElement | undefined) {
    this.set('style', style);
  }

  get target(): StringElement | undefined {
    return this.get('target');
  }

  set target(target: StringElement | undefined) {
    this.set('target', target);
  }

  get value(): Element | undefined {
    return this.get('value');
  }

  set value(value: Element | undefined) {
    this.set('value', value);
  }
}

export default Parameter;
