import { Attributes, Meta } from 'minim';
import { ObjectElement, ArrayElement, StringElement } from '@swagger-api/apidom-core';

import StandardIdentifierElement from './StandardIdentifier';
import RequirementLevelElement from './RequirementLevel';

class Requirement extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requirement';
  }

  get subject(): StandardIdentifierElement | undefined {
    return this.get('subject');
  }

  set subject(subject: StandardIdentifierElement | undefined) {
    this.set('subject', subject);
  }

  get level(): RequirementLevelElement | undefined {
    return this.get('level');
  }

  set level(level: RequirementLevelElement | undefined) {
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
