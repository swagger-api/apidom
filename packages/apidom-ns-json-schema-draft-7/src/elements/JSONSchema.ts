import { StringElement, BooleanElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  JSONSchemaElement,
  JSONReferenceElement,
  MediaElement,
} from '@swagger-api/apidom-ns-json-schema-draft-6';

/* eslint-disable class-methods-use-this */

class JSONSchema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'JSONSchemaDraft7';
  }

  /**
   * Core vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01
   */

  get $comment(): StringElement | undefined {
    return this.get('$comment');
  }

  set $comment($comment: StringElement | undefined) {
    this.set('$comment', $comment);
  }

  /**
   * Validation vocabulary
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01
   */

  /**
   * Keywords for Applying Subschemas Conditionally
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6.6
   */

  get if(): this | BooleanElement | JSONReferenceElement | undefined {
    return this.get('if');
  }

  set if(ifValue: this | BooleanElement | JSONReferenceElement | undefined) {
    this.set('if', ifValue);
  }

  get then(): this | BooleanElement | JSONReferenceElement | undefined {
    return this.get('then');
  }

  set then(then: this | BooleanElement | JSONReferenceElement | undefined) {
    this.set('then', then);
  }

  get else(): this | BooleanElement | JSONReferenceElement | undefined {
    return this.get('else');
  }

  set else(elseValue: this | BooleanElement | JSONReferenceElement | undefined) {
    this.set('else', elseValue);
  }

  /**
   * String-Encoding Non-JSON Data
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-00#section-8
   */

  get contentEncoding(): StringElement | undefined {
    return this.get('contentEncoding');
  }

  set contentEncoding(contentEncoding: StringElement | undefined) {
    this.set('contentEncoding', contentEncoding);
  }

  get contentMediaType(): StringElement | undefined {
    return this.get('contentMediaType');
  }

  set contentMediaType(contentMediaType: StringElement | undefined) {
    this.set('contentMediaType', contentMediaType);
  }

  get media(): MediaElement | undefined {
    throw new UnsupportedOperationError(
      'media keyword from Hyper-Schema vocabulary has been moved to validation vocabulary as "contentMediaType" / "contentEncoding"',
    );
  }

  set media(media: MediaElement | undefined) {
    throw new UnsupportedOperationError(
      'media keyword from Hyper-Schema vocabulary has been moved to validation vocabulary as "contentMediaType" / "contentEncoding"',
    );
  }

  /**
   * Schema annotations
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-10
   */

  get writeOnly(): BooleanElement | undefined {
    return this.get('writeOnly');
  }

  set writeOnly(writeOnly: BooleanElement | undefined) {
    this.set('writeOnly', writeOnly);
  }
}

export default JSONSchema;
