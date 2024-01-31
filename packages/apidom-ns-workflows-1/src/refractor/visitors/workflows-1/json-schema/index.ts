import { always } from 'ramda';
import {
  JsonSchemaDialectElement,
  specificationObj as OpenApi3_1Specification,
} from '@swagger-api/apidom-ns-openapi-3-1';

import JSONSchemaElement from '../../../../elements/JSONSchema';
import { SpecPath } from '../../generics/FixedFieldsVisitor';

const { $visitor: SchemaVisitor } = OpenApi3_1Specification.visitors.document.objects.Schema;

class JSONSchemaVisitor extends SchemaVisitor {
  public declare readonly element: JSONSchemaElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  public declare readonly canSupportSpecificationExtensions: false;

  public declare readonly jsonSchemaDefaultDialect: JsonSchemaDialectElement;

  constructor(...args: ConstructorParameters<typeof SchemaVisitor>) {
    super(...args);
    this.element = new JSONSchemaElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
    this.canSupportSpecificationExtensions = false;
    this.jsonSchemaDefaultDialect = new JsonSchemaDialectElement(
      'https://json-schema.org/draft/2020-12/schema',
    );
  }
}

export default JSONSchemaVisitor;
