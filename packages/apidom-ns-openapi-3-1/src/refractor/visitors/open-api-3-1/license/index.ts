import {
  specificationObj as OpenApi3_1Specification,
  LicenseVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { LicenseVisitorOptions };
class LicenseVisitor extends BaseLicenseVisitor {
  public declare readonly element: LicenseElement;

  constructor(options: LicenseVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
  }
}

export default LicenseVisitor;
