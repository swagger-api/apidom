import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqOperationBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class IbmmqOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: IbmmqOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new IbmmqOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqOperationBindingVisitor;
