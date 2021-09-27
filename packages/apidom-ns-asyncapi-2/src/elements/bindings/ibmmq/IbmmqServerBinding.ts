import { Attributes, Meta } from 'minim';
import {
  ObjectElement,
  StringElement,
  BooleanElement,
  NumberElement,
} from '@swagger-api/apidom-core';

class IbmmqServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqServerBinding';
  }

  get groupId(): StringElement {
    return this.get('groupId');
  }

  set groupId(groupId: StringElement) {
    this.set('groupId', groupId);
  }

  get ccdtQueueManagerName(): StringElement {
    return this.get('ccdtQueueManagerName');
  }

  set ccdtQueueManagerName(ccdtQueueManagerName: StringElement) {
    this.set('ccdtQueueManagerName', ccdtQueueManagerName);
  }

  get cipherSpec(): StringElement {
    return this.get('cipherSpec');
  }

  set cipherSpec(cipherSpec: StringElement) {
    this.set('cipherSpec', cipherSpec);
  }

  get multiEndpointServer(): BooleanElement {
    return this.get('multiEndpointServer');
  }

  set multiEndpointServer(multiEndpointServer: BooleanElement) {
    this.set('multiEndpointServer', multiEndpointServer);
  }

  get heartBeatInterval(): NumberElement {
    return this.get('heartBeatInterval');
  }

  set heartBeatInterval(heartBeatInterval: NumberElement) {
    this.set('heartBeatInterval', heartBeatInterval);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default IbmmqServerBinding;
