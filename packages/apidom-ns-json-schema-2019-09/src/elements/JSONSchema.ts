import {
  StringElement,
  ObjectElement,
  NumberElement,
  ArrayElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-draft-7';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class JSONSchema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchema201909';
  }

  /**
   * Core vocabulary
   *
   * URI: https://json-schema.org/draft/2019-09/vocab/core
   */

  get $vocabulary(): ObjectElement | undefined {
    return this.get('$vocabulary');
  }

  set $vocabulary($vocabulary: ObjectElement | undefined) {
    this.set('$vocabulary', $vocabulary);
  }

  get $anchor(): StringElement | undefined {
    return this.get('$anchor');
  }

  set $anchor($anchor: StringElement | undefined) {
    this.set('$anchor', $anchor);
  }

  get $recursiveAnchor(): BooleanElement | undefined {
    return this.get('$recursiveAnchor');
  }

  set $recursiveAnchor($recursiveAnchor: BooleanElement | undefined) {
    this.set('$recursiveAnchor', $recursiveAnchor);
  }

  get $recursiveRef(): StringElement | undefined {
    return this.get('$recursiveRef');
  }

  set $recursiveRef($recursiveRef: StringElement | undefined) {
    this.set('$recursiveRef', $recursiveRef);
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get $defs(): ObjectElement | undefined {
    return this.get('$defs');
  }

  set $defs($defs: ObjectElement | undefined) {
    this.set('$defs', $defs);
  }

  get definitions(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'definitions keyword from Validation vocabulary has been renamed to $defs.',
    );
  }

  set definitions(definitions: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'definitions keyword from Validation vocabulary has been renamed to $defs.',
    );
  }

  /**
   * Applicator vocabulary
   *
   * URI: https://json-schema.org/draft/2019-09/vocab/applicator
   */

  get not(): this | BooleanElement | undefined {
    return this.get('not');
  }

  set not(not: this | BooleanElement | undefined) {
    this.set('not', not);
  }

  get if(): this | BooleanElement | undefined {
    return this.get('if');
  }

  set if(ifSchema: this | BooleanElement | undefined) {
    this.set('if', ifSchema);
  }

  get then(): this | BooleanElement | undefined {
    return this.get('then');
  }

  set then(thenSchema: this | BooleanElement | undefined) {
    this.set('then', thenSchema);
  }

  get else(): this | BooleanElement | undefined {
    return this.get('else');
  }

  set else(elseSchema: this | BooleanElement | undefined) {
    this.set('else', elseSchema);
  }

  get dependentSchemas(): ObjectElement | undefined {
    return this.get('dependentSchemas');
  }

  set dependentSchemas(dependentSchemas: ObjectElement | undefined) {
    this.set('dependentSchemas', dependentSchemas);
  }

  get dependencies(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'dependencies keyword from Validation vocabulary has been renamed to dependentSchemas.',
    );
  }

  set dependencies(dependencies: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'dependencies keyword from Validation vocabulary has been renamed to dependentSchemas.',
    );
  }

  get items(): this | BooleanElement | ArrayElement | undefined {
    return this.get('items');
  }

  set items(items: this | BooleanElement | ArrayElement | undefined) {
    this.set('items', items);
  }

  get containsProp(): this | BooleanElement | undefined {
    return this.get('contains');
  }

  set containsProp(containsProp: this | BooleanElement | undefined) {
    this.set('contains', containsProp);
  }

  get additionalProperties(): this | BooleanElement | undefined {
    return this.get('additionalProperties');
  }

  set additionalProperties(additionalProperties: this | BooleanElement | undefined) {
    this.set('additionalProperties', additionalProperties);
  }

  get additionalItems(): this | BooleanElement | undefined {
    return this.get('additionalItems');
  }

  set additionalItems(additionalItems: this | BooleanElement | undefined) {
    this.set('additionalItems', additionalItems);
  }

  get propertyNames(): this | BooleanElement | undefined {
    return this.get('propertyNames');
  }

  set propertyNames(propertyNames: this | BooleanElement | undefined) {
    this.set('propertyNames', propertyNames);
  }

  get unevaluatedItems(): this | BooleanElement | undefined {
    return this.get('unevaluatedItems');
  }

  set unevaluatedItems(unevaluatedItems: this | BooleanElement | undefined) {
    this.set('unevaluatedItems', unevaluatedItems);
  }

  get unevaluatedProperties(): this | BooleanElement | undefined {
    return this.get('unevaluatedProperties');
  }

  set unevaluatedProperties(unevaluatedProperties: this | BooleanElement | undefined) {
    this.set('unevaluatedProperties', unevaluatedProperties);
  }

  /**
   * Validation vocabulary
   *
   * URI: https://json-schema.org/draft/2019-09/json-schema-validation#rfc.section.6
   */

  /**
   * Validation Keywords for Arrays
   *
   * URI: https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.4
   */

  get maxContains(): NumberElement | undefined {
    return this.get('maxContains');
  }

  set maxContains(maxContains: NumberElement | undefined) {
    this.set('maxContains', maxContains);
  }

  get minContains(): NumberElement | undefined {
    return this.get('minContains');
  }

  set minContains(minContains: NumberElement | undefined) {
    this.set('minContains', minContains);
  }

  /**
   * Validation Keywords for Objects
   *
   * URI: https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5
   */

  get dependentRequired(): ObjectElement | undefined {
    return this.get('dependentRequired');
  }

  set dependentRequired(dependentRequired: ObjectElement | undefined) {
    this.set('dependentRequired', dependentRequired);
  }

  /**
   * Vocabulary for Basic Meta-Data Annotations
   *
   * URI: https://json-schema.org/draft/2019-09/vocab/meta-data
   */

  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }

  set deprecated(deprecated: BooleanElement | undefined) {
    this.set('deprecated', deprecated);
  }

  /**
   * Vocabulary for the Contents of String-Encoded Data
   *
   * URI: https://json-schema.org/draft/2019-09/vocab/content
   */

  get contentSchema(): this | BooleanElement | undefined {
    return this.get('contentSchema');
  }

  set contentSchema(contentSchema: this | BooleanElement | undefined) {
    this.set('contentSchema', contentSchema);
  }
}

export default JSONSchema;
