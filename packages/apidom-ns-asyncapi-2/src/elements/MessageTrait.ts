import {
  ArrayElement,
  ObjectElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import CorrelationIDElement from './CorrelationID';
import ExternalDocumentationElement from './ExternalDocumentation';
import MessageBindingsElement from './MessageBindings';
import ReferenceElement from './Reference';
import SchemaElement from './Schema';
import TagsElement from './Tags';

class MessageTrait extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'messageTrait';
  }

  get messageId(): StringElement | undefined {
    return this.get('messageId');
  }

  set messageId(messageId: StringElement | undefined) {
    this.set('messageId', messageId);
  }

  get headers(): SchemaElement | ReferenceElement | undefined {
    return this.get('headers');
  }

  set headers(headers: SchemaElement | ReferenceElement | undefined) {
    this.set('headers', headers);
  }

  get correlationId(): CorrelationIDElement | ReferenceElement | undefined {
    return this.get('correlationId');
  }

  set correlationId(correlationId: CorrelationIDElement | ReferenceElement | undefined) {
    this.set('correlationId', correlationId);
  }

  get schemaFormat(): StringElement | undefined {
    return this.get('schemaFormat');
  }

  set schemaFormat(schemaFormat: StringElement | undefined) {
    this.set('schemaFormat', schemaFormat);
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

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  get bindings(): MessageBindingsElement | ReferenceElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: MessageBindingsElement | ReferenceElement | undefined) {
    this.set('bindings', bindings);
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ArrayElement | undefined) {
    this.set('examples', examples);
  }
}

export default MessageTrait;
