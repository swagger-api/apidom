import { Attributes, Meta } from 'minim';
import { ObjectElement, ArrayElement, StringElement } from '@swagger-api/apidom-core';

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

  get iri(): StringElement | undefined {
    return this.get('iri');
  }

  set iri(iri: StringElement | undefined) {
    this.set('iri', iri);
  }

  get then(): ArrayElement | undefined {
    return this.get('then');
  }

  set then(then: ArrayElement | undefined) {
    this.set('then', then);
  }
}

export default Scenario;
