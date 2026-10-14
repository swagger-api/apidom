import {
  StringElement,
  BooleanElement,
  ObjectElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentExtension extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentExtension';
    this.classes.push('agent-extension');
  }

  get uri(): StringElement | undefined {
    return this.get('uri');
  }

  set uri(uri: StringElement | undefined) {
    this.set('uri', uri);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get required(): BooleanElement | undefined {
    return this.get('required');
  }

  set required(required: BooleanElement | undefined) {
    this.set('required', required);
  }

  get params(): ObjectElement | undefined {
    return this.get('params');
  }

  set params(params: ObjectElement | undefined) {
    this.set('params', params);
  }
}

export default AgentExtension;
