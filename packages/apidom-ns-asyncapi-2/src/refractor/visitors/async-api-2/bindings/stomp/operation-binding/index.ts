import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompOperationBindingElement from '../../../../../../elements/bindings/stomp/StompOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface StompOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class StompOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StompOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: StompOperationBindingVisitorOptions) {
    super(options);
    this.element = new StompOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompOperationBindingVisitor;
