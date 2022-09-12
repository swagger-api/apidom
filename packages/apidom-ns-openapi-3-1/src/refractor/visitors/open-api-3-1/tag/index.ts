import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import TagElement from '../../../../elements/Tag';

const {
  visitors: {
    document: {
      objects: {
        Tag: { $visitor: BaseTagVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const TagVisitor = stampit(BaseTagVisitor, {
  init() {
    this.element = new TagElement();
  },
});

export default TagVisitor;
