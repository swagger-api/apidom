import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

import RequirementLevelElement from './RequirementLevel.ts';

class Standard extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'standard';
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

  get iri(): StringElement | undefined {
    return this.get('iri');
  }

  set iri(iri: StringElement | undefined) {
    this.set('iri', iri);
  }

  get level(): RequirementLevelElement | undefined {
    return this.get('level');
  }

  set level(level: RequirementLevelElement | undefined) {
    this.set('level', level);
  }
}

export default Standard;
