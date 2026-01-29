import {
  specificationObj as OpenApi3_1Specification,
  MediaTypeVisitorOptions,
  MediaTypeVisitor as MediaTypeVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import MediaTypeElement from '../../../../elements/MediaType.ts';

/**
 * @public
 */
export const BaseMediaTypeVisitor: typeof MediaTypeVisitorType =
  OpenApi3_1Specification.visitors.document.objects.MediaType.$visitor;

export type { MediaTypeVisitorOptions };

/**
 * @public
 */
class MediaTypeVisitor extends BaseMediaTypeVisitor {
  declare public readonly element: MediaTypeElement;

  constructor(options: MediaTypeVisitorOptions) {
    super(options);
    this.element = new MediaTypeElement();
  }
}

export default MediaTypeVisitor;
