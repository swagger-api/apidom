import { always } from 'ramda';
import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-1';

import JSONSchemaElement from '../../../../elements/JSONSchema';

const { $visitor: SchemaVisitor } = OpenApi3_1Specification.visitors.document.objects.Schema;

const JSONSchemaVisitor = stampit(SchemaVisitor, {
  props: {
    specPath: always(['document', 'objects', 'JSONSchema']),
    canSupportSpecificationExtensions: false,
    jsonSchemaDefaultDialect: 'https://json-schema.org/draft/2020-12/schema',
  },
  init() {
    this.element = new JSONSchemaElement();
  },
});

export default JSONSchemaVisitor;
