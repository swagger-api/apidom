import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

/**
 * @public
 */
export interface JSONSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JSONSchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public element: JSONSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new JSONSchemaElement();

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = this.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }
}

export default JSONSchemaVisitor;
