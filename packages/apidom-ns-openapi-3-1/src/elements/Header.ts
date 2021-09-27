import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement, BooleanElement } from '@swagger-api/apidom-core';

import SchemaElement from './Schema';

class Header extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'header';
  }

  get required(): BooleanElement {
    return this.get('required');
  }

  set required(required: BooleanElement) {
    this.set('required', required);
  }

  get deprecated(): BooleanElement {
    return this.get('deprecated');
  }

  set deprecated(deprecated: BooleanElement) {
    this.set('deprecated', deprecated);
  }

  get allowEmptyValue(): BooleanElement {
    return this.get('allowEmptyValue');
  }

  set allowEmptyValue(allowEmptyValue: BooleanElement) {
    this.set('allowEmptyValue', allowEmptyValue);
  }

  get style(): StringElement {
    return this.get('style');
  }

  set style(style: StringElement) {
    this.set('style', style);
  }

  get explode(): BooleanElement {
    return this.get('explode');
  }

  set explode(explode: BooleanElement) {
    this.set('explode', explode);
  }

  get allowReserved(): BooleanElement {
    return this.get('allowReserved');
  }

  set allowReserved(allowReserved: BooleanElement) {
    this.set('allowReserved', allowReserved);
  }

  get schema(): SchemaElement {
    return this.get('schema');
  }

  set schema(schema: SchemaElement) {
    this.set('schema', schema);
  }

  get example(): unknown {
    return this.get('example');
  }

  set example(example: unknown) {
    this.set('example', example);
  }

  get examples(): ObjectElement {
    return this.get('examples');
  }

  set examples(examples: ObjectElement) {
    this.set('examples', examples);
  }

  get contentProp(): ObjectElement {
    return this.get('content');
  }

  set contentProp(content: ObjectElement) {
    this.set('content', content);
  }
}

Object.defineProperty(Header.prototype, 'description', {
  get(): StringElement {
    return this.get('description');
  },
  set(description: StringElement) {
    this.set('description', description);
  },
  enumerable: true,
});

export default Header;
