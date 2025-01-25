import {
  JSONSchemaVisitor as JSONSchemaDraft6Visitor,
  JSONSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-6';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

export type { JSONSchemaVisitorOptions };

/**
 * @public
 */
class JSONSchemaVisitor extends JSONSchemaDraft6Visitor {
  declare public element: JSONSchemaElement;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultDialectIdentifier(): string {
    return 'http://json-schema.org/draft-07/schema#';
  }
}

export default JSONSchemaVisitor;
