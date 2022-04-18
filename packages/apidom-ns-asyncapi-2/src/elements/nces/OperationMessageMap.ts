import { Attributes, Meta } from 'minim';
import { ObjectElement, ArrayElement } from '@swagger-api/apidom-core';

class OperationMessageMap extends ObjectElement {
  static primaryClass = 'operation-message-map';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationMessageMap.primaryClass);
  }

  get oneOf(): ArrayElement | undefined {
    return this.get('oneOf');
  }

  set oneOf(oneOf: ArrayElement | undefined) {
    this.set('oneOf', oneOf);
  }
}

export default OperationMessageMap;
