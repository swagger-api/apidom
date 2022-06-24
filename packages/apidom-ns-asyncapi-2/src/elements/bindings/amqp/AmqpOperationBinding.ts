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

  get expiration(): NumberElement {
    return this.get('expiration');
  }

  set expiration(expiration: NumberElement) {
    this.set('expiration', expiration);
  }

  get userId(): StringElement {
    return this.get('userId');
  }

  set userId(userId: StringElement) {
    this.set('userId', userId);
  }

  get cc(): ArrayElement {
    return this.get('cc');
  }

  set cc(cc: ArrayElement) {
    this.set('cc', cc);
  }

  get priority(): NumberElement {
    return this.get('priority');
  }

  set priority(priority: NumberElement) {
    this.set('priority', priority);
  }

  get deliveryMode(): NumberElement {
    return this.get('deliveryMode');
  }

  set deliveryMode(deliveryMode: NumberElement) {
    this.set('deliveryMode', deliveryMode);
  }

  get mandatory(): BooleanElement {
    return this.get('mandatory');
  }

  set mandatory(mandatory: BooleanElement) {
    this.set('mandatory', mandatory);
  }

  get bcc(): ArrayElement {
    return this.get('bcc');
  }

  set bcc(bcc: ArrayElement) {
    this.set('bcc', bcc);
  }

  get replyTo(): StringElement {
    return this.get('replyTo');
  }

  set replyTo(replyTo: StringElement) {
    this.set('replyTo', replyTo);
  }

  get timestamp(): BooleanElement {
    return this.get('timestamp');
  }

  set timestamp(timestamp: BooleanElement) {
    this.set('timestamp', timestamp);
  }

  get ack(): BooleanElement {
    return this.get('ack');
  }

  set ack(ack: BooleanElement) {
    this.set('ack', ack);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AmqpOperationBinding;
