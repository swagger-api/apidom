import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import CriterionElement from '../../../../elements/Criterion.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface CriterionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class CriterionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: CriterionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Criterion']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: CriterionVisitorOptions) {
    super(options);
    this.element = new CriterionElement();
    this.specPath = always(['document', 'objects', 'Criterion']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default CriterionVisitor;
