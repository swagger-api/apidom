import {
  ObjectElement,
  StringElement,
  BooleanElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class IbmmqServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqServerBinding';
    this.classes.push('server-binding');
  }

  get groupId(): StringElement | undefined {
    return this.get('groupId');
  }

  set groupId(groupId: StringElement | undefined) {
    this.set('groupId', groupId);
  }

  get ccdtQueueManagerName(): StringElement | undefined {
    return this.get('ccdtQueueManagerName');
  }

  set ccdtQueueManagerName(ccdtQueueManagerName: StringElement | undefined) {
    this.set('ccdtQueueManagerName', ccdtQueueManagerName);
  }

  get cipherSpec(): StringElement | undefined {
    return this.get('cipherSpec');
  }

  set cipherSpec(cipherSpec: StringElement | undefined) {
    this.set('cipherSpec', cipherSpec);
  }

  get multiEndpointServer(): BooleanElement | undefined {
    return this.get('multiEndpointServer');
  }

  set multiEndpointServer(multiEndpointServer: BooleanElement | undefined) {
    this.set('multiEndpointServer', multiEndpointServer);
  }

  get heartBeatInterval(): NumberElement | undefined {
    return this.get('heartBeatInterval');
  }

  set heartBeatInterval(heartBeatInterval: NumberElement | undefined) {
    this.set('heartBeatInterval', heartBeatInterval);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default IbmmqServerBinding;
