import {
  specificationObj as AsyncApi2Specification,
  SchemaVisitorOptions,
  SchemaVisitor as SchemaVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import SchemaElement from '../../../../elements/Schema.ts';

export const BaseSchemaVisitor: typeof SchemaVisitorType =
  AsyncApi2Specification.visitors.document.objects.Schema.$visitor;

export type { SchemaVisitorOptions };

class SchemaVisitor extends BaseSchemaVisitor {
  declare public readonly element: SchemaElement;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.element = new SchemaElement();
  }
}

export default SchemaVisitor;