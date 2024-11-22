import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SuccessActionElement from '../../../../elements/SuccessAction.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface SuccessActionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SuccessActionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SuccessActionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SuccessAction']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: SuccessActionVisitorOptions) {
    super(options);
    this.element = new SuccessActionElement();
    this.specPath = always(['document', 'objects', 'SuccessAction']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SuccessActionVisitor;
