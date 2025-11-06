import { Attributes, Meta } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  ExternalDocumentationElement,
  AsyncApi2Element,
  TagsElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import OperationsElement from './Operations.ts';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class AsyncApi3 extends AsyncApi2Element {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApi3';
  }

  get tags(): TagsElement | undefined {
    throw new UnsupportedOperationError(
      'tags keyword has been moved to info',
    );
  }

  set tags(tags: TagsElement | undefined) {
    throw new UnsupportedOperationError(
      'tags keyword has been moved to info',
    );
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    throw new UnsupportedOperationError(
      'externalDocs keyword has been moved to info.',
    );
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    throw new UnsupportedOperationError(
      'externalDocs keyword has been moved to info.',
    );
  }

  get operations(): OperationsElement | undefined {
    return this.get('operations');
  }

  set operations(operations: OperationsElement | undefined) {
    this.set('operations', operations);
  }
}

export default AsyncApi3;
