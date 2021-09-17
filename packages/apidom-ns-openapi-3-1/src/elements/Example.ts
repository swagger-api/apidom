import { Attributes, Meta, Element } from 'minim';
import { ObjectElement, StringElement } from 'apidom';

class Example extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'example';
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(summary: StringElement) {
    this.set('summary', summary);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get value(): Element {
    return this.get('value');
  }

  set value(value: Element) {
    this.set('value', value);
  }

  get externalValue(): StringElement {
    return this.get('externalValue');
  }

  set externalValue(externalValue: StringElement) {
    this.set('externalValue', externalValue);
  }
}

export default Example;
