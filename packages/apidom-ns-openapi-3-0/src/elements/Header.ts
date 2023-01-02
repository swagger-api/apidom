import {
  ObjectElement,
  StringElement,
  BooleanElement,
  Attributes,
  Meta,
  Element,
} from '@swagger-api/apidom-core';

import SchemaElement from './Schema';
import ReferenceElement from './Reference';

class Header extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'header';
  }

  get required(): BooleanElement {
    if (this.hasKey('required')) {
      return this.get('required');
    }
    return new BooleanElement(false);
  }

  set required(required: BooleanElement | undefined) {
    this.set('required', required);
  }

  get deprecated(): BooleanElement | undefined {
    if (this.hasKey('deprecated')) {
      return this.get('deprecated');
    }
    return new BooleanElement(false);
  }

  set deprecated(deprecated: BooleanElement | undefined) {
    this.set('deprecated', deprecated);
  }

  get allowEmptyValue(): BooleanElement | undefined {
    return this.get('allowEmptyValue');
  }

  set allowEmptyValue(allowEmptyValue: BooleanElement | undefined) {
    this.set('allowEmptyValue', allowEmptyValue);
  }

  get style(): StringElement | undefined {
    return this.get('style');
  }

  set style(style: StringElement | undefined) {
    this.set('style', style);
  }

  get explode(): BooleanElement | undefined {
    return this.get('explode');
  }

  set explode(explode: BooleanElement | undefined) {
    this.set('explode', explode);
  }

  get allowReserved(): BooleanElement | undefined {
    return this.get('allowReserved');
  }

  set allowReserved(allowReserved: BooleanElement | undefined) {
    this.set('allowReserved', allowReserved);
  }

  get schema(): SchemaElement | ReferenceElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | ReferenceElement | undefined) {
    this.set('schema', schema);
  }

  get example(): Element | undefined {
    return this.get('example');
  }

  set example(example: Element | undefined) {
    this.set('example', example);
  }

  get examples(): ObjectElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ObjectElement | undefined) {
    this.set('examples', examples);
  }

  get contentProp(): ObjectElement | undefined {
    return this.get('content');
  }

  set contentProp(content: ObjectElement | undefined) {
    this.set('content', content);
  }
}

Object.defineProperty(Header.prototype, 'description', {
  get(): StringElement | undefined {
    return this.get('description');
  },
  set(description: StringElement | undefined) {
    this.set('description', description);
  },
  enumerable: true,
});

export default Header;
