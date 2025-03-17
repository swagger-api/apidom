import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FailureActionElement from '../../../../elements/FailureAction.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface FailureActionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class FailureActionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: FailureActionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'FailureAction']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: FailureActionVisitorOptions) {
    super(options);
    this.element = new FailureActionElement();
    this.specPath = always(['document', 'objects', 'FailureAction']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default FailureActionVisitor;
