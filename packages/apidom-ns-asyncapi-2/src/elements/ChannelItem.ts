import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import OperationElement from './Operation';
import ParametersElement from './Parameters';
import ChannelBindingsElement from './ChannelBindings';

class ChannelItem extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channelItem';
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get servers(): ArrayElement | undefined {
    return this.get('servers');
  }

  set servers(servers: ArrayElement | undefined) {
    this.set('servers', servers);
  }

  get subscribe(): OperationElement | undefined {
    return this.get('subscribe');
  }

  set subscribe(subscribe: OperationElement | undefined) {
    this.set('subscribe', subscribe);
  }

  get publish(): OperationElement | undefined {
    return this.get('publish');
  }

  set publish(publish: OperationElement | undefined) {
    this.set('publish', publish);
  }

  get parameters(): ParametersElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ParametersElement | undefined) {
    this.set('parameters', parameters);
  }

  get bindings(): ChannelBindingsElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: ChannelBindingsElement | undefined) {
    this.set('bindings', bindings);
  }
}

export default ChannelItem;
