import {
  JSONSchemaVisitor as JSONSchema201909Visitor,
  JSONSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2019-09';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

export type { JSONSchemaVisitorOptions };

/**
 * @public
 */
class JSONSchemaVisitor extends JSONSchema201909Visitor {
  declare public element: JSONSchemaElement;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultDialectIdentifier(): string {
    return 'https://json-schema.org/draft/2020-12/schema';
  }
}

export default JSONSchemaVisitor;
