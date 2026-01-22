import { Attributes, Meta } from '@swagger-api/apidom-core';
import { MediaTypeElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';

/**
 * @public
 */
class MediaType extends MediaTypeElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
  }

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
}

export default MediaType;
