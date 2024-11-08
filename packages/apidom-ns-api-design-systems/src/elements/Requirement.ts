import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import StandardIdentifierElement from './StandardIdentifier.ts';
import RequirementLevelElement from './RequirementLevel.ts';

class Requirement extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requirement';
  }

  get subject(): StandardIdentifierElement {
    return this.get('subject');
  }

  set subject(subject: StandardIdentifierElement) {
    this.set('subject', subject);
  }

  get level(): RequirementLevelElement {
    return this.get('level');
  }

  set level(level: RequirementLevelElement) {
    this.set('level', level);
  }

  get values(): ArrayElement | undefined {
    return this.get('values');
  }

  set values(values: ArrayElement | undefined) {
    this.set('values', values);
  }

  get follows(): StringElement | undefined {
    return this.get('follows');
  }

  set follows(follows: StringElement | undefined) {
    this.set('follows', follows);
  }
}

export default Requirement;
