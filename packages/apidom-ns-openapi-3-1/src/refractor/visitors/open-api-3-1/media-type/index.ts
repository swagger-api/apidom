import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const MediaTypeVisitor = stampit(BaseMediaTypeVisitor, {
  init() {
    this.element = new MediaTypeElement();
  },
});

export default MediaTypeVisitor;
