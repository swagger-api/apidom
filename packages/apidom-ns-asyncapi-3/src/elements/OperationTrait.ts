import {
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import { OperationTraitElement } from '@swagger-api/apidom-ns-asyncapi-2';

/**
 * @public
 */
class OperationTrait extends OperationTraitElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operationTrait';
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
