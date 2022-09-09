import {
  StringElement,
  ObjectElement,
  NumberElement,
  ArrayElement,
  BooleanElement,
  Element,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import XmlElement from './Xml';
import DiscriminatorElement from './Discriminator';
import ExternalDocumentationElement from './ExternalDocumentation';

class Schema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
  }

  /**
   * Core vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/core
   */

  get $schema(): StringElement | undefined {
    return this.get('$schema');
  }

  get $vocabulary(): ObjectElement | undefined {
    return this.get('$vocabulary');
  }

  get $id(): StringElement | undefined {
    return this.get('$id');
  }

  get $anchor(): StringElement | undefined {
    return this.get('$anchor');
  }

  get $dynamicAnchor(): StringElement | undefined {
    return this.get('$dynamicAnchor');
  }

  get $dynamicRef(): StringElement | undefined {
    return this.get('$dynamicRef');
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  get $defs(): ObjectElement | undefined {
    return this.get('$defs');
  }

  get $comment(): StringElement | undefined {
    return this.get('$comment');
  }

  /**
   * Applicator vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/applicator
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

  get if(): Schema | undefined {
    return this.get('if');
  }

  get then(): Schema | undefined {
    return this.get('then');
  }

  get else(): Schema | undefined {
    return this.get('else');
  }

  get dependentSchemas(): ObjectElement | undefined {
    return this.get('dependentSchemas');
  }

  get prefixItems(): ArrayElement | undefined {
    return this.get('prefixItems');
  }

  get items(): Schema | undefined {
    return this.get('items');
  }

  get containsProp(): Schema | undefined {
    return this.get('contains');
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

  get propertyNames(): Schema | undefined {
    return this.get('propertyNames');
  }

  /**
   * Unevaluated Locations vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/unevaluated
   */

  get unevaluatedItems(): Schema | undefined {
    return this.get('unevaluatedItems');
  }

  get unevaluatedProperties(): Schema | undefined {
    return this.get('unevaluatedProperties');
  }

  /**
   * Validation vocabulary
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/validation
   */

  /**
   *  Validation Keywords for Any Instance Type
   *
   *  URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.1
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
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#numeric
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
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#string
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
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.4
   */

  get maxItems(): NumberElement | undefined {
    return this.get('maxItems');
  }

  get minItems(): NumberElement | undefined {
    return this.get('minItems');
  }

  get uniqueItems(): BooleanElement | undefined {
    return this.get('uniqueItems');
  }

  get maxContains(): NumberElement | undefined {
    return this.get('maxContains');
  }

  get minContains(): NumberElement | undefined {
    return this.get('minContains');
  }

  /**
   * Validation Keywords for Objects
   *
   * URI: https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.6.5
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

  get dependentRequired(): ObjectElement | undefined {
    return this.get('dependentRequired');
  }

  /**
   * Vocabulary for Basic Meta-Data Annotations
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/meta-data
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

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
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
   * Vocabularies for Semantic Content With "format"
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/format-annotation
   */

  get format(): StringElement | undefined {
    return this.get('format');
  }

  /**
   * Vocabulary for the Contents of String-Encoded Data
   *
   * URI: https://json-schema.org/draft/2020-12/vocab/content
   */

  get contentEncoding(): StringElement | undefined {
    return this.get('contentEncoding');
  }

  get contentMediaType(): StringElement | undefined {
    return this.get('contentMediaType');
  }

  get contentSchema(): Schema | undefined {
    return this.get('contentSchema');
  }

  /**
   * OAS base vocabulary
   *
   * URI: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#baseVocabulary
   */

  get discriminator(): DiscriminatorElement | undefined {
    return this.get('discriminator');
  }

  get xml(): XmlElement | undefined {
    return this.get('xml');
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  /**
   * @deprecated The example property has been deprecated in favor of the JSON Schema examples keyword. Use of example is discouraged, and later versions of this specification may remove it.
   */
  get example(): Element | undefined {
    return this.get('example');
  }
}

export default Schema;
