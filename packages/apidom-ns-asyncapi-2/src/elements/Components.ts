import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Components extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'components';
  }

  get schemas(): ObjectElement | undefined {
    return this.get('schemas');
  }

  set schemas(schemas: ObjectElement | undefined) {
    this.set('schemas', schemas);
  }

  get servers(): ObjectElement | undefined {
    return this.get('servers');
  }

  set servers(servers: ObjectElement | undefined) {
    this.set('servers', servers);
  }

  get serverVariables(): ObjectElement | undefined {
    return this.get('serverVariables');
  }

  set serverVariables(serverVariables: ObjectElement | undefined) {
    this.set('serverVariables', serverVariables);
  }

  get messages(): ObjectElement | undefined {
    return this.get('messages');
  }

  set messages(messages: ObjectElement | undefined) {
    this.set('messages', messages);
  }

  get securitySchemes(): ObjectElement | undefined {
    return this.get('securitySchemes');
  }

  set securitySchemes(securitySchemes: ObjectElement | undefined) {
    this.set('securitySchemes', securitySchemes);
  }

  get parameters(): ObjectElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ObjectElement | undefined) {
    this.set('parameters', parameters);
  }

  get correlationIds(): ObjectElement | undefined {
    return this.get('correlationIds');
  }

  set correlationIds(correlationIds: ObjectElement | undefined) {
    this.set('correlationIds', correlationIds);
  }

  get operationTraits(): ObjectElement | undefined {
    return this.get('operationTraits');
  }

  set operationTraits(operationTraits: ObjectElement | undefined) {
    this.set('operationTraits', operationTraits);
  }

  get messageTraits(): ObjectElement | undefined {
    return this.get('messageTraits');
  }

  set messageTraits(messageTraits: ObjectElement | undefined) {
    this.set('messageTraits', messageTraits);
  }

  get serverBindings(): ObjectElement | undefined {
    return this.get('serverBindings');
  }

  set serverBindings(serverBindings: ObjectElement | undefined) {
    this.set('serverBindings', serverBindings);
  }

  get channelBindings(): ObjectElement | undefined {
    return this.get('channelBindings');
  }

  set channelBindings(channelBindings: ObjectElement | undefined) {
    this.set('channelBindings', channelBindings);
  }

  get operationBindings(): ObjectElement | undefined {
    return this.get('operationBindings');
  }

  set operationBindings(operationBindings: ObjectElement | undefined) {
    this.set('operationBindings', operationBindings);
  }

  get messageBindings(): ObjectElement | undefined {
    return this.get('messageBindings');
  }

  set messageBindings(messageBindings: ObjectElement | undefined) {
    this.set('messageBindings', messageBindings);
  }
}

export default Components;
