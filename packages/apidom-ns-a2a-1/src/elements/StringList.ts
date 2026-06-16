import { ArrayElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 *
 * A2A's StringList is a wrapper object with a single `list` array property
 * (modelled this way in the schema to satisfy protobuf's repeated-string
 * encoding inside a map value).
 */
class StringList extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'stringList';
    this.classes.push('string-list');
  }

  get list(): ArrayElement | undefined {
    return this.get('list');
  }

  set list(list: ArrayElement | undefined) {
    this.set('list', list);
  }
}

export default StringList;
