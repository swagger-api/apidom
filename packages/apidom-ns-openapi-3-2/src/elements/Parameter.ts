import { ParameterElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';

/**
 * @public
 */
class Parameter extends ParameterElement {
  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
    this.set('schema', schema);
  }
}

export default Parameter;
