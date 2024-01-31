import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import MediaTypeElement from '../../../../elements/MediaType';

const {
  visitors: {
    document: {
      objects: {
        MediaType: { $visitor: BaseMediaTypeVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class MediaTypeVisitor extends BaseMediaTypeVisitor {
  public declare readonly element: MediaTypeElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MediaTypeElement();
  }
}

export default MediaTypeVisitor;
