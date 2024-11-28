import { always } from 'ramda';
import {
  JsonSchemaDialectElement,
  specificationObj as OpenApi3_1Specification,
  SchemaVisitorOptions,
  SchemaVisitor as SchemaVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import JSONSchemaElement from '../../../../elements/JSONSchema.ts';
import { SpecPath } from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export const SchemaVisitor: typeof SchemaVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Schema.$visitor;

/**
 * @public
 */
export type JSONSchemaVisitorOptions = SchemaVisitorOptions;

/**
 * @public
 */
class JSONSchemaVisitor extends SchemaVisitor {
  declare public readonly element: JSONSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  declare protected readonly canSupportSpecificationExtensions: false;

  declare protected readonly jsonSchemaDefaultDialect: JsonSchemaDialectElement;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
    this.canSupportSpecificationExtensions = false;
    this.jsonSchemaDefaultDialect = new JsonSchemaDialectElement(
      'https://json-schema.org/draft/2020-12/schema',
    );
  }
}

export default JSONSchemaVisitor;
