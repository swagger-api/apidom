import {
  Element,
  ArrayElement,
  NumberElement,
  ObjectElement,
  StringElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import MediaElement from './Media';

class JSONSchema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchemaDraft4';
  }

  /**
   * Core vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-00
   */

  get idProp(): StringElement | undefined {
    return this.get('id');
  }

  get $schema(): StringElement | undefined {
    return this.get('$schema');
  }

  /**
   * Validation vocabulary
   *
   * URI: https://tools.ietf.org/html/draft-wright-json-schema-validation-00
   */

  /**
   *  Validation keywords for numeric instances (number and integer)
   */

  get multipleOf(): NumberElement | undefined {
    return this.get('multipleOf');
  }

  get maximum(): NumberElement | undefined {
    return this.get('maximum');
  }

  get exclusiveMaximum(): NumberElement | undefined {
    return this.get('exclusiveMaximum');
  }

  get minimum(): NumberElement | undefined {
    return this.get('minimum');
  }

  get exclusiveMinimum(): NumberElement | undefined {
    return this.get('exclusiveMinimum');
  }

  /**
   * Validation keywords for strings
   */

  get maxLength(): NumberElement | undefined {
    return this.get('maxLength');
  }

  get minLength(): NumberElement | undefined {
    return this.get('minLength');
  }

  get pattern(): StringElement | undefined {
    return this.get('pattern');
  }

  /**
   * Validation keywords for arrays
   */

  get additionalItems(): BooleanElement | this | undefined {
    return this.get('additionalItems');
  }

  get items(): this | ArrayElement | undefined {
    return this.get('items');
  }

  get maxItems(): NumberElement | undefined {
    return this.get('maxItems');
  }

  get minItems(): NumberElement | undefined {
    return this.get('minItems');
  }

  get uniqueItems(): BooleanElement | undefined {
    return this.get('uniqueItems');
  }

  /**
   * Validation keywords for objects
   */

  get maxProperties(): NumberElement | undefined {
    return this.get('maxProperties');
  }

  get minProperties(): NumberElement | undefined {
    return this.get('minProperties');
  }

  get required(): ArrayElement | undefined {
    return this.get('required');
  }

  get properties(): ObjectElement | undefined {
    return this.get('properties');
  }

  get additionalProperties(): BooleanElement | this | undefined {
    return this.get('additionalProperties');
  }

  get patternProperties(): ObjectElement | undefined {
    return this.get('patternProperties');
  }

  get dependencies(): ObjectElement | undefined {
    return this.get('dependencies');
  }

  /**
   *  Validation keywords for any instance type
   */

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  get type(): ArrayElement | StringElement | undefined {
    return this.get('type');
  }

  get allOf(): ArrayElement | undefined {
    return this.get('allOf');
  }

  get anyOf(): ArrayElement | undefined {
    return this.get('anyOf');
  }

  get oneOf(): ArrayElement | undefined {
    return this.get('oneOf');
  }

  get not(): this | undefined {
    return this.get('not');
  }

  get definitions(): ObjectElement | undefined {
    return this.get('definitions');
  }

  /**
   * Metadata keywords
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-6
   */

  get title(): StringElement | undefined {
    return this.get('title');
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  get default(): Element | undefined {
    return this.get('default');
  }

  /**
   * Semantic validation with "format"
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-7
   */

  get format(): StringElement | undefined {
    return this.get('format');
  }

  /**
   * JSON Hyper-Schema
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-00
   */

  get base(): StringElement | undefined {
    return this.get('base');
  }

  get links(): ArrayElement | undefined {
    return this.get('links');
  }

  get media(): MediaElement | undefined {
    return this.get('media');
  }

  get readOnly(): BooleanElement | undefined {
    return this.get('readOnly');
  }
}

export default JSONSchema;
