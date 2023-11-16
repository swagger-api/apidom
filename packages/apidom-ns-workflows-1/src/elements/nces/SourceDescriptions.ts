import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SourceDescriptions extends ArrayElement {
  static primaryClass = 'sourceDescriptions';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SourceDescriptions.primaryClass);
  }
}

export default SourceDescriptions;
