import {
  ArrayElement,
  ObjectElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import AgentCapabilitiesElement from './AgentCapabilities.ts';
import AgentProviderElement from './AgentProvider.ts';

/**
 * @public
 *
 * Root element for an A2A Agent Card document.
 */
class AgentCard extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'a2aAgentCard1';
    this.classes.push('api');
    this.classes.push('agent-card');
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get version(): StringElement | undefined {
    return this.get('version');
  }

  set version(version: StringElement | undefined) {
    this.set('version', version);
  }

  get iconUrl(): StringElement | undefined {
    return this.get('iconUrl');
  }

  set iconUrl(iconUrl: StringElement | undefined) {
    this.set('iconUrl', iconUrl);
  }

  get documentationUrl(): StringElement | undefined {
    return this.get('documentationUrl');
  }

  set documentationUrl(documentationUrl: StringElement | undefined) {
    this.set('documentationUrl', documentationUrl);
  }

  get provider(): AgentProviderElement | undefined {
    return this.get('provider');
  }

  set provider(provider: AgentProviderElement | undefined) {
    this.set('provider', provider);
  }

  get capabilities(): AgentCapabilitiesElement | undefined {
    return this.get('capabilities');
  }

  set capabilities(capabilities: AgentCapabilitiesElement | undefined) {
    this.set('capabilities', capabilities);
  }

  get defaultInputModes(): ArrayElement | undefined {
    return this.get('defaultInputModes');
  }

  set defaultInputModes(defaultInputModes: ArrayElement | undefined) {
    this.set('defaultInputModes', defaultInputModes);
  }

  get defaultOutputModes(): ArrayElement | undefined {
    return this.get('defaultOutputModes');
  }

  set defaultOutputModes(defaultOutputModes: ArrayElement | undefined) {
    this.set('defaultOutputModes', defaultOutputModes);
  }

  get supportedInterfaces(): ArrayElement | undefined {
    return this.get('supportedInterfaces');
  }

  set supportedInterfaces(supportedInterfaces: ArrayElement | undefined) {
    this.set('supportedInterfaces', supportedInterfaces);
  }

  get skills(): ArrayElement | undefined {
    return this.get('skills');
  }

  set skills(skills: ArrayElement | undefined) {
    this.set('skills', skills);
  }

  get securitySchemes(): ObjectElement | undefined {
    return this.get('securitySchemes');
  }

  set securitySchemes(securitySchemes: ObjectElement | undefined) {
    this.set('securitySchemes', securitySchemes);
  }

  get securityRequirements(): ArrayElement | undefined {
    return this.get('securityRequirements');
  }

  set securityRequirements(securityRequirements: ArrayElement | undefined) {
    this.set('securityRequirements', securityRequirements);
  }

  get signatures(): ArrayElement | undefined {
    return this.get('signatures');
  }

  set signatures(signatures: ArrayElement | undefined) {
    this.set('signatures', signatures);
  }
}

export default AgentCard;
