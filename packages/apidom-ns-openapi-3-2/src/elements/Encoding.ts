import { StringElement } from '@swagger-api/apidom-core';
import { EncodingElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';

/**
 * @public
 */
class Encoding extends EncodingElement {
  /**
   * OpenAPI 3.2: Schema for encoding the content.
   */
  get encoding(): SchemaElement | undefined {
    return this.get('encoding');
  }

  set encoding(encoding: SchemaElement | undefined) {
    this.set('encoding', encoding);
  }

  /**
   * OpenAPI 3.2: Controls how prefixes are encoded in sequential/streaming formats.
   */
  get prefixEncoding(): StringElement | undefined {
    return this.get('prefixEncoding');
  }

  set prefixEncoding(prefixEncoding: StringElement | undefined) {
    this.set('prefixEncoding', prefixEncoding);
  }

  /**
   * OpenAPI 3.2: Controls how items are encoded in array/sequential formats.
   */
  get itemEncoding(): StringElement | undefined {
    return this.get('itemEncoding');
  }

  set itemEncoding(itemEncoding: StringElement | undefined) {
    this.set('itemEncoding', itemEncoding);
  }
}

export default Encoding;
