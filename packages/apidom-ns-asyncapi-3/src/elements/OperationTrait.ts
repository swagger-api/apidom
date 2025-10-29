import {
  StringElement,
  Attributes,
  Meta,
  ObjectElement,
} from '@swagger-api/apidom-core';

import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import { OperationTraitElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';

/**
 * @public
 */
class OperationTrait extends OperationTraitElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operationTrait';
  }

get operationId(): ObjectElement | undefined {
  throw new UnsupportedOperationError(
    'operationId keyword from Core vocabulary has been removed',
  );
}

set operationId(operationId: ObjectElement | undefined) {
  throw new UnsupportedOperationError(
    'operationId keyword from Core vocabulary has been removed',
  );
}

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined | any{
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined | any) {
    this.set('externalDocs', externalDocs);
  }
}

export default OperationTrait;
