import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import StandardIdentifierElement from './StandardIdentifier.ts';

class Scenario extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'scenario';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get when(): StandardIdentifierElement {
    return this.get('when');
  }

  set when(when: StandardIdentifierElement) {
    this.set('when', when);
  }

  get then(): ArrayElement | undefined {
    return this.get('then');
  }

  set then(then: ArrayElement | undefined) {
    this.set('then', then);
  }
}

export default Scenario;
