import { StringElement, ObjectElement, ArrayElement } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import { LinkDescriptionElement } from '@swagger-api/apidom-ns-json-schema-draft-6';

/* eslint-disable class-methods-use-this */

/**
 * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-01#section-6
 */

class LinkDescription extends LinkDescriptionElement {
  /**
   * Link context.
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-hyperschema-01#section-6.1
   */

  get anchor(): StringElement | undefined {
    return this.get('anchor');
  }

  set anchor(anchor: StringElement | undefined) {
    this.set('anchor', anchor);
  }

  get anchorPointer(): StringElement | undefined {
    return this.get('anchorPointer');
  }

  set anchorPointer(anchorPointer: StringElement | undefined) {
    this.set('anchorPointer', anchorPointer);
  }

  /**
   * Adjusting URI Template Resolution.
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-hyperschema-01#section-6.4
   */

  get templatePointers(): ObjectElement | undefined {
    return this.get('templatePointers');
  }

  set templatePointers(templatePointers: ObjectElement | undefined) {
    this.set('templatePointers', templatePointers);
  }

  get templateRequired(): ArrayElement | undefined {
    return this.get('templateRequired');
  }

  set templateRequired(templateRequired: ArrayElement | undefined) {
    this.set('templateRequired', templateRequired);
  }

  /**
   * Link Target Attributes.
   *
   * URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-hyperschema-01#section-6.5
   */

  get mediaType(): StringElement | undefined {
    throw new UnsupportedOperationError(
      'mediaType keyword from Hyper-Schema vocabulary has been renamed to targetMediaType.',
    );
  }

  set mediaType(mediaType: StringElement | undefined) {
    throw new UnsupportedOperationError(
      'mediaType keyword from Hyper-Schema vocabulary has been renamed to targetMediaType.',
    );
  }

  get targetMediaType(): StringElement | undefined {
    return this.get('targetMediaType');
  }

  set targetMediaType(targetMediaType: StringElement | undefined) {
    this.set('targetMediaType', targetMediaType);
  }

  get targetHints(): ObjectElement | undefined {
    return this.get('targetHints');
  }

  set targetHints(targetHints: ObjectElement | undefined) {
    this.set('targetHints', targetHints);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get $comment(): StringElement | undefined {
    return this.get('$comment');
  }

  set $comment($comment: StringElement | undefined) {
    this.set('$comment', $comment);
  }

  /**
   *  Submitting Data for Processing.
   *
   *  URI: https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-hyperschema-01#section-6.6.4
   */
  get submissionEncType(): StringElement | undefined {
    throw new UnsupportedOperationError(
      'submissionEncType keyword from Hyper-Schema vocabulary has been renamed to submissionMediaType.',
    );
  }

  set submissionEncType(submissionEncType: StringElement | undefined) {
    throw new UnsupportedOperationError(
      'submissionEncType keyword from Hyper-Schema vocabulary has been renamed to submissionMediaType.',
    );
  }

  get submissionMediaType(): StringElement | undefined {
    return this.get('submissionMediaType');
  }

  set submissionMediaType(submissionMediaType: StringElement | undefined) {
    this.set('submissionMediaType', submissionMediaType);
  }
}

export default LinkDescription;
