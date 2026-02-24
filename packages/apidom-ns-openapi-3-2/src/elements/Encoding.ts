import { ArrayElement, ObjectElement } from '@swagger-api/apidom-core';
import { EncodingElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Encoding extends EncodingElement {
  /**
   * OpenAPI 3.2: A map between a property name and its encoding information.
   * Applies nested Encoding Objects in the same manner as the Media Type Object's encoding field.
   */
  get encoding(): ObjectElement | undefined {
    return this.get('encoding');
  }

  set encoding(encoding: ObjectElement | undefined) {
    this.set('encoding', encoding);
  }

  /**
   * OpenAPI 3.2: An array of positional encoding information.
   * Applies nested Encoding Objects in the same manner as the Media Type Object's prefixEncoding field.
   */
  get prefixEncoding(): ArrayElement | undefined {
    return this.get('prefixEncoding');
  }

  set prefixEncoding(prefixEncoding: ArrayElement | undefined) {
    this.set('prefixEncoding', prefixEncoding);
  }

  /**
   * OpenAPI 3.2: A single Encoding Object that provides encoding information for array items.
   * Applies nested Encoding Objects in the same manner as the Media Type Object's itemEncoding field.
   */
  get itemEncoding(): Encoding | undefined {
    return this.get('itemEncoding');
  }

  set itemEncoding(itemEncoding: Encoding | undefined) {
    this.set('itemEncoding', itemEncoding);
  }
}

export default Encoding;
