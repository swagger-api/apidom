import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import TagsElement from './Tags.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import OperationBindingsElement from './OperationBindings.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class OperationTrait extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operationTrait';
  }

  get operationId(): StringElement | undefined {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement | undefined) {
    this.set('operationId', operationId);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }

  get tags(): TagsElement | undefined {
    return this.get('tags');
  }

  set tags(tags: TagsElement | undefined) {
    this.set('tags', tags);
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  get bindings(): OperationBindingsElement | ReferenceElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: OperationBindingsElement | ReferenceElement | undefined) {
    this.set('bindings', bindings);
  }
}

export default OperationTrait;
