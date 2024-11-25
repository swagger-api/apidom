import {
  specificationObj as OpenApi3_1Specification,
  LicenseVisitorOptions,
  LicenseVisitor as LicenseVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import LicenseElement from '../../../../elements/License.ts';

/**
 * @public
 */
export const BaseLicenseVisitor: typeof LicenseVisitorType =
  OpenApi3_1Specification.visitors.document.objects.License.$visitor;

export type { LicenseVisitorOptions };

/**
 * @public
 */
class LicenseVisitor extends BaseLicenseVisitor {
  public declare readonly element: LicenseElement;

  constructor(options: LicenseVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
  }
}

export default LicenseVisitor;
