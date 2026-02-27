import { ArrayElement } from '@swagger-api/apidom-core';
import { MediaTypeElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';
import EncodingElement from './Encoding.ts';

/**
 * @public
 */
class MediaType extends MediaTypeElement {
  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
    this.set('schema', schema);
  }

  /**
   * OpenAPI 3.2: Schema for items in sequential/streaming media types.
   * Used for formats like application/jsonl, application/json-seq, text/event-stream.
   */
  get itemSchema(): SchemaElement | undefined {
    return this.get('itemSchema');
  }

  set itemSchema(itemSchema: SchemaElement | undefined) {
    this.set('itemSchema', itemSchema);
  }

  /**
   * OpenAPI 3.2: An array of positional encoding information for sequential/streaming formats.
   * The prefixEncoding field SHALL only apply when the media type is multipart.
   */
  get prefixEncoding(): ArrayElement | undefined {
    return this.get('prefixEncoding');
  }

  set prefixEncoding(prefixEncoding: ArrayElement | undefined) {
    this.set('prefixEncoding', prefixEncoding);
  }

  /**
   * OpenAPI 3.2: A single Encoding Object that provides encoding information for array items.
   * The itemEncoding field SHALL only apply when the media type is multipart.
   */
  get itemEncoding(): EncodingElement | undefined {
    return this.get('itemEncoding');
  }

  set itemEncoding(itemEncoding: EncodingElement | undefined) {
    this.set('itemEncoding', itemEncoding);
  }
}

export default MediaType;
