import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
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

  // eslint-disable-next-line class-methods-use-this
  get defaultDialectIdentifier(): string {
    return 'http://json-schema.org/draft-06/schema#';
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new JSONSchemaElement();
    this.handleDialectIdentifier(objectElement);
    this.handleSchemaIdentifier(objectElement);

    // for further processing consider this Schema Element as parent for all embedded Schema Elements
    this.parent = this.element;

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = this.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  handleSchemaIdentifier(objectElement: ObjectElement, identifierKeyword: string = '$id'): void {
    return JSONSchemaDraft4Visitor.prototype.handleSchemaIdentifier.call(
      this,
      objectElement,
      identifierKeyword,
    );
  }
}

export default JSONSchemaVisitor;
