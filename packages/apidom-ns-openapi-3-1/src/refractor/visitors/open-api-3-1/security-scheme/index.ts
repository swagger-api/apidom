import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import SecuritySchemeElement from '../../../../elements/SecurityScheme';

const {
  visitors: {
    document: {
      objects: {
        SecurityScheme: { $visitor: BaseSecuritySchemeVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const SecuritySchemeVisitor = stampit(BaseSecuritySchemeVisitor, {
  init() {
    this.element = new SecuritySchemeElement();
  },
});

export default SecuritySchemeVisitor;
