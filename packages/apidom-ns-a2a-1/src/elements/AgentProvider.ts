import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentProvider extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentProvider';
    this.classes.push('agent-provider');
  }

  get organization(): StringElement | undefined {
    return this.get('organization');
  }

  set organization(organization: StringElement | undefined) {
    this.set('organization', organization);
  }

  get url(): StringElement | undefined {
    return this.get('url');
  }

  set url(url: StringElement | undefined) {
    this.set('url', url);
  }
}

export default AgentProvider;
