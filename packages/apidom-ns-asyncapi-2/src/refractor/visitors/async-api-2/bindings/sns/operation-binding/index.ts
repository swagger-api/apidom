import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsOperationBindingElement from '../../../../../../elements/bindings/sns/SnsOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class SnsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SnsOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SnsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsOperationBindingVisitor;
