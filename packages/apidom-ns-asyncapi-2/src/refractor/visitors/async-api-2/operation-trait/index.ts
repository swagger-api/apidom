import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OperationTraitElement from '../../../../elements/OperationTrait.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

export interface OperationTraitVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class OperationTraitVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OperationTraitElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'OperationTrait']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: OperationTraitVisitorOptions) {
    super(options);
    this.element = new OperationTraitElement();
    this.specPath = always(['document', 'objects', 'OperationTrait']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OperationTraitVisitor;
