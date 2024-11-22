import { ObjectElement, StringElement, Element, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Example extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'example';
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get value(): Element | undefined {
    return this.get('value');
  }

  set value(value: Element | undefined) {
    this.set('value', value);
  }

  get externalValue(): StringElement | undefined {
    return this.get('externalValue');
  }

  set externalValue(externalValue: StringElement | undefined) {
    this.set('externalValue', externalValue);
  }
}

export default Example;
