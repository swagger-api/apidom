import { StringElement } from '@swagger-api/apidom-core';
import { MediaTypeElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';

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

export default MediaType;
