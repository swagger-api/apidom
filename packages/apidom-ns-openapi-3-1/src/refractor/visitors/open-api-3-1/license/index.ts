import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import LicenseElement from '../../../../elements/License';

const {
  visitors: {
    document: {
      objects: {
        License: { $visitor: BaseLicenseVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const LicenseVisitor = stampit(BaseLicenseVisitor, {
  init() {
    this.element = new LicenseElement();
  },
});

export default LicenseVisitor;
