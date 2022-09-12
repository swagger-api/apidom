import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import InfoElement from '../../../../elements/Info';

const {
  visitors: {
    document: {
      objects: {
        Info: { $visitor: BaseInfoVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const InfoVisitor = stampit(BaseInfoVisitor, {
  init() {
    this.element = new InfoElement();
  },
});

export default InfoVisitor;
