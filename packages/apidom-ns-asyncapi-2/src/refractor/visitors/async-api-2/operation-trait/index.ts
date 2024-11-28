import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OperationTraitElement from '../../../../elements/OperationTrait.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface OperationTraitVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OperationTraitVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OperationTraitElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OperationTrait']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: OperationTraitVisitorOptions) {
    super(options);
    this.element = new OperationTraitElement();
    this.specPath = always(['document', 'objects', 'OperationTrait']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OperationTraitVisitor;
