import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OperationBindingsElement from '../../../../elements/OperationBindings';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface OperationBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class OperationBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OperationBindingsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'OperationBindings']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: OperationBindingsVisitorOptions) {
    super(options);
    this.element = new OperationBindingsElement();
    this.specPath = always(['document', 'objects', 'OperationBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OperationBindingsVisitor;
