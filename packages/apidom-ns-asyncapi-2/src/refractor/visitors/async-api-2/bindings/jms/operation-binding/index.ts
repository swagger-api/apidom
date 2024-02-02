import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsOperationBindingElement from '../../../../../../elements/bindings/jms/JmsOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class JmsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: JmsOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new JmsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsOperationBindingVisitor;
