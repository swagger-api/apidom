import {  Attributes, Meta } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import { ExternalDocumentationElement, AsyncApi2Element, TagsElement } from '@swagger-api/apidom-ns-asyncapi-2';
import OperationElement from './Operation.ts';

/**
 * @public
 */
class AsyncApi3 extends AsyncApi2Element {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi3';
    this.classes.push('api');
  }
  
  get tags(): TagsElement | undefined {
    throw new UnsupportedOperationError(
      'TagsElement keyword from Core vocabulary has been moved to Info.',
    );
  }

  set tags(tags: TagsElement | undefined) {
   throw new UnsupportedOperationError(
      'TagsElement keyword from Core vocabulary has been moved to Info.',
    );
  }
  
  get externalDocs(): ExternalDocumentationElement | undefined {
    throw new UnsupportedOperationError(
      'ExternalDocsElement keyword from Core vocabulary has been moved to Info.',
    );
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
   throw new UnsupportedOperationError(
      'ExternalDocsElement keyword from Core vocabulary has been moved to Info.',
    );
  }

  get operations(): OperationElement {
    return this.get('operations');
  }

  set operations(val) {
    this.set('operations', val);
  }
}

export default AsyncApi3;
