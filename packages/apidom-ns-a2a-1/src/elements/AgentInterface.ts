import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentInterface extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentInterface';
    this.classes.push('agent-interface');
  }

  get url(): StringElement | undefined {
    return this.get('url');
  }

  set url(url: StringElement | undefined) {
    this.set('url', url);
  }

  get protocolBinding(): StringElement | undefined {
    return this.get('protocolBinding');
  }

  set protocolBinding(protocolBinding: StringElement | undefined) {
    this.set('protocolBinding', protocolBinding);
  }

  get protocolVersion(): StringElement | undefined {
    return this.get('protocolVersion');
  }

  set protocolVersion(protocolVersion: StringElement | undefined) {
    this.set('protocolVersion', protocolVersion);
  }

  get tenant(): StringElement | undefined {
    return this.get('tenant');
  }

  set tenant(tenant: StringElement | undefined) {
    this.set('tenant', tenant);
  }
}

export default AgentInterface;
