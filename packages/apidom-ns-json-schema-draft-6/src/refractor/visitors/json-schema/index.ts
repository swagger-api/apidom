import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';
import {
  JSONSchemaVisitor as JSONSchemaDraft4Visitor,
  JSONSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

export type { JSONSchemaVisitorOptions };

/**
 * @public
 */
class JSONSchemaVisitor extends JSONSchemaDraft4Visitor {
  declare public element: JSONSchemaElement;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
  }

  // eslint-disable-next-line class-methods-use-this
  get defaultDialectIdentifier(): string {
    return 'http://json-schema.org/draft-06/schema#';
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = this.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  handleSchemaIdentifier(objectElement: ObjectElement, identifierKeyword: string = '$id'): void {
    return super.handleSchemaIdentifier(objectElement, identifierKeyword);
  }
}

export default JSONSchemaVisitor;
