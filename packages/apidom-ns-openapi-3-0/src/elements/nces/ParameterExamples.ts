import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ParameterExamples extends ObjectElement {
  static primaryClass = 'parameter-examples';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ParameterExamples.primaryClass);
    this.classes.push('examples');
  }
}

export default ParameterExamples;
