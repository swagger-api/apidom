import {
  ArrayElement,
  ObjectElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class AgentSkill extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'agentSkill';
    this.classes.push('agent-skill');
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

  get tags(): ArrayElement | undefined {
    return this.get('tags');
  }

  set tags(tags: ArrayElement | undefined) {
    this.set('tags', tags);
  }

  get examples(): ArrayElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ArrayElement | undefined) {
    this.set('examples', examples);
  }

  get inputModes(): ArrayElement | undefined {
    return this.get('inputModes');
  }

  set inputModes(inputModes: ArrayElement | undefined) {
    this.set('inputModes', inputModes);
  }

  get outputModes(): ArrayElement | undefined {
    return this.get('outputModes');
  }

  set outputModes(outputModes: ArrayElement | undefined) {
    this.set('outputModes', outputModes);
  }

  get securityRequirements(): ArrayElement | undefined {
    return this.get('securityRequirements');
  }

  set securityRequirements(securityRequirements: ArrayElement | undefined) {
    this.set('securityRequirements', securityRequirements);
  }
}

export default AgentSkill;
