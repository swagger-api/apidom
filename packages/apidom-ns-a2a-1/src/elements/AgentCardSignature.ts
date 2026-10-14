import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentCardSignature extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentCardSignature';
    this.classes.push('agent-card-signature');
  }

  get protected(): StringElement | undefined {
    return this.get('protected');
  }

  set protected(protectedValue: StringElement | undefined) {
    this.set('protected', protectedValue);
  }

  get signature(): StringElement | undefined {
    return this.get('signature');
  }

  set signature(signature: StringElement | undefined) {
    this.set('signature', signature);
  }

  get header(): ObjectElement | undefined {
    return this.get('header');
  }

  set header(header: ObjectElement | undefined) {
    this.set('header', header);
  }
}

export default AgentCardSignature;
