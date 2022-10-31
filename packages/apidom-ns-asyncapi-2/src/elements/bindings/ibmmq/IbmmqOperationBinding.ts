import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class IbmmqOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default IbmmqOperationBinding;
