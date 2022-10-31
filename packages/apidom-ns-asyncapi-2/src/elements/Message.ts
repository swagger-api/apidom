import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import CorrelationIDElement from './CorrelationID';
import ReferenceElement from './Reference';
import SchemaElement from './Schema';
import TagsElement from './Tags';
import ExternalDocumentationElement from './ExternalDocumentation';
import MessageBindingsElement from './MessageBindings';

class Message extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'message';
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

  get payload(): SchemaElement | ReferenceElement | Element | undefined {
    return this.get('payload');
  }

  set payload(payload: SchemaElement | ReferenceElement | Element | undefined) {
    this.set('payload', payload);
  }

  get correlationId(): CorrelationIDElement | ReferenceElement | undefined {
    return this.get('correlationId');
  }

  set correlationId(correlationId: CorrelationIDElement | ReferenceElement | undefined) {
    this.set('correlationId', correlationId);
  }

  get schemaFormat(): StringElement {
    return this.get('schemaFormat');
  }

  set schemaFormat(schemaFormat: StringElement) {
    this.set('schemaFormat', schemaFormat);
  }

  get contentType(): StringElement {
    return this.get('contentType');
  }

  set contentType(contentType: StringElement) {
    this.set('contentType', contentType);
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get title(): StringElement {
    return this.get('title');
  }

  set title(title: StringElement) {
    this.set('title', title);
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(summary: StringElement) {
    this.set('summary', summary);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
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

  get traits(): ArrayElement | undefined {
    return this.get('traits');
  }

  set traits(traits: ArrayElement | undefined) {
    this.set('traits', traits);
  }
}

export default Message;
