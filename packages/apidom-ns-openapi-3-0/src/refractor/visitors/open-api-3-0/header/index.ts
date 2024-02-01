import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HeaderElement from '../../../../elements/Header';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface HeaderVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class HeaderVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: HeaderElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Header']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: HeaderVisitorOptions) {
    super(options);
    this.element = new HeaderElement();
    this.specPath = always(['document', 'objects', 'Header']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default HeaderVisitor;
