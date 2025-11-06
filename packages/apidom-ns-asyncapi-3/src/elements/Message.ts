import { Attributes, Meta, StringElement } from '@swagger-api/apidom-core';
import {
  ExternalDocumentationElement,
  MessageElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import MultiformatSchemaElement from './MultiFormatSchema.ts';
import SchemaElement from './Schema.ts';
import ReferenceElement from './Reference.ts';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class Message extends MessageElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'message';
  }

  get messageId(): StringElement | undefined {
    throw new UnsupportedOperationError('messageId has been removed');
  }

  set messageId(messageId: StringElement | undefined) {
    throw new UnsupportedOperationError('messageId has been removed');
  }
  
  get headers(): MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined | any {
    return this.get('headers');
  }

  set headers(headers: MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined | any) {
    this.set('headers', headers);
  }

  get payload(): MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined  | any{
    return this.get('payload');
  }

  set payload(payload: MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined | any) {
    this.set('payload', payload);
  }

  get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined | any {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined | any) {
    this.set('externalDocs', externalDocs);
  }
}

export default Message;
