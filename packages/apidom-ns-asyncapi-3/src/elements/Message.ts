import { Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import {
  CorrelationIDElement,
  ExternalDocumentationElement,
  MessageBindingsElement,
  TagsElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import MultiformatSchemaElement from './MultiFormatSchema.ts';
import SchemaElement from './Schema.ts';
import ReferenceElement from './Reference.ts';
import MessageExampleElement from './MessageExample.ts';
import MessageTrait from './MessageTrait.ts';

/* eslint-disable class-methods-use-this */

/**
 * @public
 */
class Message extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'message';
  }

  get headers(): MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined {
    return this.get('headers');
  }

  set headers(headers: MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined) {
    this.set('headers', headers);
  }

  get payload(): MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined {
    return this.get('payload');
  }

  set payload(payload: MultiformatSchemaElement | SchemaElement | ReferenceElement | undefined) {
    this.set('payload', payload);
  }

  get correlationId(): CorrelationIDElement | ReferenceElement | undefined {
    return this.get('correlationId');
  }

  set correlationId(correlationId: CorrelationIDElement | ReferenceElement | undefined) {
    this.set('correlationId', correlationId);
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

  set examples(examples: [MessageExampleElement] | undefined) {
    this.set('examples', examples);
  }

  get traits(): [MessageTrait] | [ReferenceElement] | undefined {
    return this.get('traits');
  }

  set traits(traits: [MessageTrait] | [ReferenceElement] | undefined) {
    this.set('traits', traits);
  }
}

export default Message;
