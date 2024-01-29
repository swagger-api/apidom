import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { isNonEmptyString, isNull, isUndefined } from 'ramda-adjunct';
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
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { isSchemaElement, isJsonSchemaDialectElement } from '../../../../predicates';
import SchemaElement from '../../../../elements/Schema';
import JsonSchemaDialectElement from '../../../../elements/JsonSchemaDialect';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';

export interface SchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    ParentSchemaAwareVisitorOptions {}

class SchemaVisitor extends Mixin(FixedFieldsVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare readonly element: SchemaElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  public declare readonly canSupportSpecificationExtensions: true;

  public declare readonly jsonSchemaDefaultDialect: JsonSchemaDialectElement;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
    this.jsonSchemaDefaultDialect = JsonSchemaDialectElement.default;
    this.passingOptionsNames.push('parent');
  }

  public ObjectElement(objectElement: ObjectElement) {
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

  public BooleanElement(booleanElement: BooleanElement) {
    const result = super.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  /**
   * This function depends on some external context, so we need to make sure this function
   * works even when no context is provided like when directly refracting generic Object Element
   * into Schema Element: SchemaElement.refract(new ObjectElement({ type: 'object' });
   */
  private getJsonSchemaDialect(): JsonSchemaDialectElement {
    let jsonSchemaDialect;

    if (
      this.openApiSemanticElement !== null &&
      // @ts-ignore
      isJsonSchemaDialectElement(this.openApiSemanticElement.jsonSchemaDialect)
    ) {
      // @ts-ignore
      jsonSchemaDialect = toValue(this.openApiSemanticElement.jsonSchemaDialect);
    } else if (
      this.openApiGenericElement !== null &&
      isStringElement(this.openApiGenericElement.get('jsonSchemaDialect'))
    ) {
      jsonSchemaDialect = toValue(this.openApiGenericElement.get('jsonSchemaDialect'));
    } else {
      jsonSchemaDialect = toValue(this.jsonSchemaDefaultDialect);
    }

    return jsonSchemaDialect;
  }

  private handle$schema(objectElement: ObjectElement): void {
    // handle $schema keyword in embedded resources
    if (
      (isNull(this.parent) || isUndefined(this.parent)) &&
      !isStringElement(objectElement.get('$schema'))
    ) {
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

  private handle$id(objectElement: ObjectElement): void {
    // handle $id keyword in embedded resources
    // fetch parent's inherited$id
    const inherited$id =
      this.parent !== null && this.parent !== undefined
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
