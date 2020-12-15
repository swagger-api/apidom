import { Attributes, BooleanElement, Meta, ObjectElement, StringElement } from 'minim';

import SchemaElement from './Schema';

class Parameter extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get in(): StringElement {
    return this.get('in');
  }

  set in(val: StringElement) {
    this.set('in', val);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
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

export default Parameter;
