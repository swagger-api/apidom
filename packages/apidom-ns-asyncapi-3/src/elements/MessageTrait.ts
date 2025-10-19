import {
  ObjectElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import CorrelationIDElement from './CorrelationID.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import MessageBindingsElement from './MessageBindings.ts';
import ReferenceElement from './Reference.ts';
import SchemaElement from './Schema.ts';
import TagsElement from './Tag.ts';
import MultiFormatSchema from './MultiFormatSchema.ts';
import MessageExampleElement from './MessageExample.ts';

/**
 * @public
 */
class MessageTrait extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'messageTrait';
  }

  get headers(): MultiFormatSchema| SchemaElement | ReferenceElement | undefined {
    return this.get('headers');
  }

  set headers(headers: MultiFormatSchema  | SchemaElement | ReferenceElement | undefined) {
    this.set('headers', headers);
  }

  get correlationId(): CorrelationIDElement | ReferenceElement | undefined {
    return this.get('correlationId');
  }

  set correlationId(correlationId: CorrelationIDElement | ReferenceElement | undefined) {
    this.set('correlationId', correlationId);
  }

  get contentType(): StringElement | undefined {
    return this.get('contentType');
  }

  set contentType(contentType: StringElement | undefined) {
    this.set('contentType', contentType);
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
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

  get bindings(): MessageBindingsElement | ReferenceElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: MessageBindingsElement | ReferenceElement | undefined) {
    this.set('bindings', bindings);
  }

  get examples(): MessageExampleElement[] | undefined {
    return this.get('examples');
  }

  set examples(examples: MessageExampleElement[] | undefined) {
    this.set('examples', examples);
  }
}

export default MessageTrait;
