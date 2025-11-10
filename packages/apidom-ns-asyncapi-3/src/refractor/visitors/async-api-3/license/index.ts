import {
  specificationObj as AsyncApi2Specification,
  LicenseVisitorOptions,
  LicenseVisitor as LicenseVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import LicenseElement from '../../../../elements/License.ts';

/**
 * @public
 */
export const BaseLicenseVisitor: typeof LicenseVisitorType =
  AsyncApi2Specification.visitors.document.objects.License.$visitor;

export type { LicenseVisitorOptions };

/**
 * @public
 */
class LicenseVisitor extends BaseLicenseVisitor {
  declare public readonly element: LicenseElement;

  constructor(options: LicenseVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
  }
}

export default LicenseVisitor;
