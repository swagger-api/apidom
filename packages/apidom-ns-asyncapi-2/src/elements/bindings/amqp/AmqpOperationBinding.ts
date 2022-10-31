import {
  StringElement,
  ObjectElement,
  NumberElement,
  ArrayElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class AmqpOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpOperationBinding';
    this.classes.push('operation-binding');
  }

  get expiration(): NumberElement | undefined {
    return this.get('expiration');
  }

  set expiration(expiration: NumberElement | undefined) {
    this.set('expiration', expiration);
  }

  get userId(): StringElement | undefined {
    return this.get('userId');
  }

  set userId(userId: StringElement | undefined) {
    this.set('userId', userId);
  }

  get cc(): ArrayElement | undefined {
    return this.get('cc');
  }

  set cc(cc: ArrayElement | undefined) {
    this.set('cc', cc);
  }

  get priority(): NumberElement | undefined {
    return this.get('priority');
  }

  set priority(priority: NumberElement | undefined) {
    this.set('priority', priority);
  }

  get deliveryMode(): NumberElement | undefined {
    return this.get('deliveryMode');
  }

  set deliveryMode(deliveryMode: NumberElement | undefined) {
    this.set('deliveryMode', deliveryMode);
  }

  get mandatory(): BooleanElement | undefined {
    return this.get('mandatory');
  }

  set mandatory(mandatory: BooleanElement | undefined) {
    this.set('mandatory', mandatory);
  }

  get bcc(): ArrayElement | undefined {
    return this.get('bcc');
  }

  set bcc(bcc: ArrayElement | undefined) {
    this.set('bcc', bcc);
  }

  get replyTo(): StringElement | undefined {
    return this.get('replyTo');
  }

  set replyTo(replyTo: StringElement | undefined) {
    this.set('replyTo', replyTo);
  }

  get timestamp(): BooleanElement | undefined {
    return this.get('timestamp');
  }

  set timestamp(timestamp: BooleanElement | undefined) {
    this.set('timestamp', timestamp);
  }

  get ack(): BooleanElement | undefined {
    return this.get('ack');
  }

  set ack(ack: BooleanElement | undefined) {
    this.set('ack', ack);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AmqpOperationBinding;
