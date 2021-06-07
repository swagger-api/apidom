import {
  Element,
  ArrayElement,
  NumberElement,
  Attributes,
  Meta,
  ObjectElement,
  StringElement,
  BooleanElement,
} from 'minim';

import ExternalDocumentationElement from './ExternalDocumentation';

class Schema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
  }

  /**
   * Core vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01
   */

  get $id(): StringElement | undefined {
    return this.get('$id');
  }

  get $comment(): StringElement | undefined {
    return this.get('$comment');
  }

  /**
   * Validation vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01
   */

  /**
   *  Validation Keywords for Applying Subschemas With Boolean Logic
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.7
   */

  get allOf(): ArrayElement | undefined {
    return this.get('allOf');
  }

  get anyOf(): ArrayElement | undefined {
    return this.get('anyOf');
  }

  get oneOf(): ArrayElement | undefined {
    return this.get('oneOf');
  }

  get not(): Schema | undefined {
    return this.get('not');
  }

  /**
   *  Validation Keywords for Applying Subschemas Conditionally
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.6
   */

  get if(): Schema | undefined {
    return this.get('if');
  }

  get then(): Schema | undefined {
    return this.get('then');
  }

  get else(): Schema | undefined {
    return this.get('else');
  }

  /**
   *  Validation Keywords for Any Instance Type
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.1
   */

  get type(): ArrayElement | StringElement | undefined {
    return this.get('type');
  }

  get enum(): ArrayElement | undefined {
    return this.get('enum');
  }

  get const(): Element | undefined {
    return this.get('const');
  }

  /**
   * Validation Keywords for Numeric Instances (number and integer)
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.2
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
   * Validation Keywords for Strings
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.3
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
   * Validation Keywords for Arrays
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.4
   */

  get items(): Schema | undefined {
    return this.get('items');
  }

  get additionalItems(): Schema | undefined {
    return this.get('additionalItems');
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

  get containsProp(): Schema | undefined {
    return this.get('contains');
  }

  /**
   * Validation Keywords for Objects
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.5
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

  get patternProperties(): ObjectElement | undefined {
    return this.get('patternProperties');
  }

  get additionalProperties(): Schema | undefined {
    return this.get('additionalProperties');
  }

  get dependencies(): ObjectElement | undefined {
    return this.get('dependencies');
  }

  get propertyNames(): Schema | undefined {
    return this.get('propertyNames');
  }

  /**
   * Vocabulary for Schema Annotations
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-10
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

  get readOnly(): BooleanElement | undefined {
    return this.get('readOnly');
  }

  get writeOnly(): BooleanElement | undefined {
    return this.get('writeOnly');
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  /**
   * Vocabularies for Semantic Validation With "format"
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-7
   */

  get format(): StringElement | undefined {
    return this.get('format');
  }

  /**
   * Vocabulary for String-Encoding Non-JSON Data
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-8
   */

  get contentEncoding(): StringElement | undefined {
    return this.get('contentEncoding');
  }

  get contentMediaType(): StringElement | undefined {
    return this.get('contentMediaType');
  }

  /**
   * Vocabulary for Schema Re-Use With "definitions"
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-9
   */

  get definitions(): ObjectElement | undefined {
    return this.get('definitions');
  }

  /**
   * AsyncAPI vocabulary vocabulary
   *
   * URI: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#baseVocabulary
   */

  get discriminator(): StringElement | undefined {
    return this.get('discriminator');
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }
}

export default Schema;
