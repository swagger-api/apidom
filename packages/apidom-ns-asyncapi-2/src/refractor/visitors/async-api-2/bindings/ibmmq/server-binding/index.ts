import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqServerBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class IbmmqServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: IbmmqServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new IbmmqServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqServerBindingVisitor;
