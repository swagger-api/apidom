import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { MessageTraitElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';

import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import SchemaElement from './Schema.ts';
import MultiFormatSchema from './MultiFormatSchema.ts';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class MessageTrait extends MessageTraitElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'messageTrait';
  }

  get messageId(): StringElement | undefined {
    throw new UnsupportedOperationError('messageId keyword from Core vocabulary has been removed');
  }

  set messageId(messageId: StringElement | undefined) {
    throw new UnsupportedOperationError('messageId keyword from Core vocabulary has been removed');
  }

  get headers(): MultiFormatSchema | SchemaElement | ReferenceElement | undefined | any {
    return this.get('headers');
  }

  set headers(headers: MultiFormatSchema | SchemaElement | ReferenceElement | undefined | any) {
    this.set('headers', headers);
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined | any {
    return this.get('externalDocs');
  }

  set externalDocs(
    externalDocs: ExternalDocumentationElement | ReferenceElement | undefined | any,
  ) {
    this.set('externalDocs', externalDocs);
  }
}

export default MessageTrait;
