import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import LicenseElement from '../../../../elements/License.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface LicenseVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class LicenseVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: LicenseElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'License']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: LicenseVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
    this.specPath = always(['document', 'objects', 'License']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default LicenseVisitor;
