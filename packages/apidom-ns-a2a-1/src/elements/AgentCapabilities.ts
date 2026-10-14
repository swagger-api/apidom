import {
  ArrayElement,
  BooleanElement,
  ObjectElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentCapabilities extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentCapabilities';
    this.classes.push('agent-capabilities');
  }

  get streaming(): BooleanElement | undefined {
    return this.get('streaming');
  }

  set streaming(streaming: BooleanElement | undefined) {
    this.set('streaming', streaming);
  }

  get pushNotifications(): BooleanElement | undefined {
    return this.get('pushNotifications');
  }

  set pushNotifications(pushNotifications: BooleanElement | undefined) {
    this.set('pushNotifications', pushNotifications);
  }

  get extendedAgentCard(): BooleanElement | undefined {
    return this.get('extendedAgentCard');
  }

  set extendedAgentCard(extendedAgentCard: BooleanElement | undefined) {
    this.set('extendedAgentCard', extendedAgentCard);
  }

  get extensions(): ArrayElement | undefined {
    return this.get('extensions');
  }

  set extensions(extensions: ArrayElement | undefined) {
    this.set('extensions', extensions);
  }
}

export default AgentCapabilities;
