import {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  NumberElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema.ts';
import ReferenceElement from '../../Reference.ts';

/**
 * @public
 */
class SolaceOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'solaceOperationBinding';
    this.classes.push('operation-binding');
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }

  get destinations(): ArrayElement | undefined {
    return this.get('destinations');
  }

  set destinations(destinations: ArrayElement | undefined) {
    this.set('destinations', destinations);
  }

  get timeToLive(): NumberElement | SchemaElement | ReferenceElement | undefined {
    return this.get('timeToLive');
  }

  set timeToLive(timeToLive: NumberElement | SchemaElement | ReferenceElement | undefined) {
    this.set('timeToLive', timeToLive);
  }

  get priority(): NumberElement | SchemaElement | ReferenceElement | undefined {
    return this.get('priority');
  }

  set priority(priority: NumberElement | SchemaElement | ReferenceElement | undefined) {
    this.set('priority', priority);
  }

  get dmqEligible(): BooleanElement | undefined {
    return this.get('dmqEligible');
  }

  set dmqEligible(dmqEligible: BooleanElement | undefined) {
    this.set('dmqEligible', dmqEligible);
  }
}

export default SolaceOperationBinding;
