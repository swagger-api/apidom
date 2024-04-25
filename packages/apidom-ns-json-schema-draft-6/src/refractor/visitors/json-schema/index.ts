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

import JSONSchemaElement from '../../../elements/JSONSchema';

export interface JSONSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class JSONSchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare element: JSONSchemaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

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
