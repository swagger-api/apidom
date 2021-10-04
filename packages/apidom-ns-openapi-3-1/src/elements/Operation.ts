import { Attributes, Meta } from 'minim';
import { ObjectElement, BooleanElement, StringElement } from '@swagger-api/apidom-core';

import ParameterElement from './Parameter';
import ReferenceElement from './Reference';
import ServerElement from './Server';
import ExternalDocumentationElement from './ExternalDocumentation';
import RequestBodyElement from './RequestBody';
import ResponsesElement from './Responses';
import CallbackElement from './Callback';
import SecurityRequirementElement from './SecurityRequirement';

class Operation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get tags(): StringElement[] {
    return this.get('tags');
  }

  set tags(tags: StringElement[]) {
    this.set('tags', tags);
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(description: StringElement) {
    this.set('summary', description);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  set externalDocs(externalDocs: ExternalDocumentationElement) {
    this.set('externalDocs', externalDocs);
  }

  get externalDocs(): ExternalDocumentationElement {
    return this.get('externalDocs');
  }

  get operationId(): StringElement {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement) {
    this.set('operationId', operationId);
  }

  get parameters(): ParameterElement[] | ReferenceElement[] {
    return this.get('parameters');
  }

  set parameters(parameters: ParameterElement[] | ReferenceElement[]) {
    this.set('parameters', parameters);
  }

  get requestBody(): RequestBodyElement {
    return this.get('requestBody');
  }

  set requestBody(requestBody: RequestBodyElement) {
    this.set('requestBody', requestBody);
  }

  get responses(): ResponsesElement {
    return this.get('responses');
  }

  set responses(responses: ResponsesElement) {
    this.set('responses', responses);
  }

  get callbacks(): Record<string, CallbackElement | ReferenceElement> {
    return this.get('callbacks');
  }

  set callbacks(callbacks: Record<string, CallbackElement | ReferenceElement>) {
    this.set('callbacks', callbacks);
  }

  get deprecated(): BooleanElement {
    if (this.hasKey('deprecated')) {
      return this.get('deprecated');
    }
    return new BooleanElement(false);
  }

  set deprecated(deprecated: BooleanElement) {
    this.set('deprecated', deprecated);
  }

  get security(): SecurityRequirementElement[] {
    return this.get('security');
  }

  set security(security: SecurityRequirementElement[]) {
    this.set('security', security);
  }

  get servers(): ServerElement[] {
    return this.get('severs');
  }

  set servers(servers: ServerElement[]) {
    this.set('servers', servers);
  }
}

export default Operation;
