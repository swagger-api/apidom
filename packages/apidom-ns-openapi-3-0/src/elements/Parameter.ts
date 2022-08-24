import {
  Element,
  ObjectElement,
  BooleanElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import SchemaElement from './Schema';

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

  get required(): BooleanElement | undefined {
    return this.get('required');
  }

  set required(required: BooleanElement | undefined) {
    this.set('required', required);
  }

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
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

  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
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

Object.defineProperty(Parameter.prototype, 'description', {
  get(): StringElement | undefined {
    return this.get('description');
  },
  set(description: StringElement | undefined) {
    this.set('description', description);
  },
  enumerable: true,
});

export default Parameter;
