import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement, isStringElement, toValue } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';
import {
  JSONSchemaVisitor,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

import { isJsonSchemaDialectElement } from '../../../../predicates.ts';
import SchemaElement from '../../../../elements/Schema.ts';
import JsonSchemaDialectElement from '../../../../elements/JsonSchemaDialect.ts';
/**
 * @public
 */
export interface SchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SchemaVisitor extends Mixin(FixedFieldsVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  declare public readonly element: SchemaElement;

  declare protected readonly jsonSchemaDefaultDialect: JsonSchemaDialectElement;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
    this.jsonSchemaDefaultDialect = JsonSchemaDialectElement.default;
    this.passingOptionsNames.push('parent');
  }

  ObjectElement(objectElement: ObjectElement) {
    this.handleDialectIdentifier(objectElement);
    this.handleSchemaIdentifier(objectElement);

    // for further processing consider this Schema Element as parent for all embedded Schema Elements
    this.parent = this.element;
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this SchemaElement with reference metadata
    if (isStringElement(this.element.$ref)) {
      this.element.classes.push('reference-element');
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }

  BooleanElement(booleanElement: BooleanElement) {
    return JSONSchemaVisitor.prototype.BooleanElement.call(this, booleanElement);
  }

  /**
   * This function depends on some external context, so we need to make sure this function
   * works even when no context is provided like when directly refracting generic Object Element
   * into Schema Element: `SchemaElement.refract(new ObjectElement({ type: 'object' });`
   */
  get defaultDialectIdentifier(): JsonSchemaDialectElement {
    let jsonSchemaDialect;

    if (
      this.openApiSemanticElement !== undefined &&
      // @ts-ignore
      isJsonSchemaDialectElement(this.openApiSemanticElement.jsonSchemaDialect)
    ) {
      // @ts-ignore
      jsonSchemaDialect = toValue(this.openApiSemanticElement.jsonSchemaDialect);
    } else if (
      this.openApiGenericElement !== undefined &&
      isStringElement(this.openApiGenericElement.get('jsonSchemaDialect'))
    ) {
      jsonSchemaDialect = toValue(this.openApiGenericElement.get('jsonSchemaDialect'));
    } else {
      jsonSchemaDialect = toValue(this.jsonSchemaDefaultDialect);
    }

    return jsonSchemaDialect;
  }

  handleDialectIdentifier(objectElement: ObjectElement): void {
    return JSONSchemaVisitor.prototype.handleDialectIdentifier.call(this, objectElement);
  }

  handleSchemaIdentifier(objectElement: ObjectElement): void {
    return JSONSchemaVisitor.prototype.handleSchemaIdentifier.call(this, objectElement);
  }
}

export default SchemaVisitor;
