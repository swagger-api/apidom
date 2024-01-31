import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class LicenseVisitor extends BaseLicenseVisitor {
  public declare readonly element: LicenseElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
  }
}

export default LicenseVisitor;
