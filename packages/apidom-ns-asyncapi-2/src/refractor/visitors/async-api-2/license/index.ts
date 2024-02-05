import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import LicenseElement from '../../../../elements/License';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface LicenseVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class LicenseVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: LicenseElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'License']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: LicenseVisitorOptions) {
    super(options);
    this.element = new LicenseElement();
    this.specPath = always(['document', 'objects', 'License']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default LicenseVisitor;
