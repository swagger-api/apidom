import {
  ObjectElement,
  StringElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import TagsElement from './Tags';
import ExternalDocumentationElement from './ExternalDocumentation';
import OperationBindingsElement from './OperationBindings';
import MessageElement from './Message';
import ReferenceElement from './Reference';

class Operation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get operationId(): StringElement | undefined {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement | undefined) {
    this.set('operationId', operationId);
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

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
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

  get bindings(): OperationBindingsElement | ReferenceElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: OperationBindingsElement | ReferenceElement | undefined) {
    this.set('bindings', bindings);
  }

  get traits(): ArrayElement | undefined {
    return this.get('traits');
  }

  set traits(traits: ArrayElement | undefined) {
    this.set('traits', traits);
  }

  get message(): MessageElement | ReferenceElement | ObjectElement | undefined {
    return this.get('message');
  }

  set message(message: MessageElement | ReferenceElement | ObjectElement | undefined) {
    this.set('message', message);
  }
}

export default Operation;
