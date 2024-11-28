import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HeaderElement from '../../../../elements/Header.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface HeaderVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class HeaderVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HeaderElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Header']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: HeaderVisitorOptions) {
    super(options);
    this.element = new HeaderElement();
    this.specPath = always(['document', 'objects', 'Header']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default HeaderVisitor;
