import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as AsyncApi2Specification,
  SchemaVisitorOptions,
  SchemaVisitor as SchemaVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import SchemaElement from '../../../../elements/Schema.ts';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor.ts';

export const BaseSchemaVisitor: typeof SchemaVisitorType =
  AsyncApi2Specification.visitors.document.objects.Schema.$visitor;

export type { SchemaVisitorOptions };

/**
 * @public
 */
class SchemaVisitor extends BaseSchemaVisitor {
  declare public element: SchemaElement;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new SchemaElement();

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default SchemaVisitor;
