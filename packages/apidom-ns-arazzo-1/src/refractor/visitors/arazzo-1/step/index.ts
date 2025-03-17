import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StepElement from '../../../../elements/Step.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface StepVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class StepVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StepElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Step']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: StepVisitorOptions) {
    super(options);
    this.element = new StepElement();
    this.specPath = always(['document', 'objects', 'Step']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default StepVisitor;
