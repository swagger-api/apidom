import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { isNonEmptyString, isUndefined } from 'ramda-adjunct';
import {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  isStringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { isSchemaElement, isJsonSchemaDialectElement } from '../../../../predicates.ts';
import SchemaElement from '../../../../elements/Schema.ts';
import JsonSchemaDialectElement from '../../../../elements/JsonSchemaDialect.ts';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';

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
    this.handle$schema(objectElement);
    this.handle$id(objectElement);

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
    const result = super.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  /**
   * This function depends on some external context, so we need to make sure this function
   * works even when no context is provided like when directly refracting generic Object Element
   * into Schema Element: `SchemaElement.refract(new ObjectElement({ type: 'object' });`
   */
  getJsonSchemaDialect(): JsonSchemaDialectElement {
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

  handle$schema(objectElement: ObjectElement): void {
    // handle $schema keyword in embedded resources
    if (isUndefined(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // no parent available and no $schema is defined, set default jsonSchemaDialect
      this.element.setMetaProperty('inherited$schema', this.getJsonSchemaDialect());
    } else if (isSchemaElement(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // parent is available and no $schema is defined, set parent $schema
      const inherited$schema = defaultTo(
        toValue(this.parent.meta.get('inherited$schema')),
        toValue(this.parent.$schema),
      );
      this.element.setMetaProperty('inherited$schema', inherited$schema);
    }
  }

  handle$id(objectElement: ObjectElement): void {
    // handle $id keyword in embedded resources
    // fetch parent's inherited$id
    const inherited$id =
      this.parent !== undefined
        ? cloneDeep(this.parent.getMetaProperty('inherited$id', []))
        : new ArrayElement();
    // get current $id keyword
    const $id = toValue(objectElement.get('$id'));

    // remember $id keyword if it's a non-empty strings
    if (isNonEmptyString($id)) {
      inherited$id.push($id);
    }

    this.element.setMetaProperty('inherited$id', inherited$id);
  }
}

export default SchemaVisitor;
