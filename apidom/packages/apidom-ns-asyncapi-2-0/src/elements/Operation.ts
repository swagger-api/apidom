import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement, ArrayElement } from 'apidom';

import TagsElement from './Tags';
import ExternalDocumentationElement from './ExternalDocumentation';
import OperationBindingsElement from './OperationBindings';
import ReferenceElement from './Reference';

class Operation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get operationId(): StringElement {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement) {
    this.set('operationId', operationId);
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

  get message(): ArrayElement | undefined {
    return this.get('message');
  }

  set message(message: ArrayElement | undefined) {
    this.set('message', message);
  }
}

export default Operation;
