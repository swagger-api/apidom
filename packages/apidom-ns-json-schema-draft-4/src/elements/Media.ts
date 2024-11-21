import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-00#section-4.3
 * @public
 */

class Media extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'media';
  }

  get binaryEncoding(): StringElement | undefined {
    return this.get('binaryEncoding');
  }

  set binaryEncoding(binaryEncoding: StringElement | undefined) {
    this.set('binaryEncoding', binaryEncoding);
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }
}

export default Media;
