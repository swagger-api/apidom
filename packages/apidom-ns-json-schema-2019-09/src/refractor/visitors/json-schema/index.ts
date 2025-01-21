import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement, isStringElement } from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
  JSONSchemaVisitor as JSONSchemaDraft7Visitor,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

/**
 * @public
 */
export interface JSONSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JSONSchemaVisitor extends Mixin(
  FixedFieldsVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
) {
  declare public element: JSONSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultDialectIdentifier(): string {
    return 'https://json-schema.org/draft/2019-09/schema';
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new JSONSchemaElement();
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
    const result = this.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  handleDialectIdentifier(objectElement: ObjectElement): void {
    return JSONSchemaDraft7Visitor.prototype.handleDialectIdentifier.call(this, objectElement);
  }

  handleSchemaIdentifier(objectElement: ObjectElement, identifierKeyword: string = '$id'): void {
    return JSONSchemaDraft7Visitor.prototype.handleSchemaIdentifier.call(
      this,
      objectElement,
      identifierKeyword,
    );
  }
}

export default JSONSchemaVisitor;
