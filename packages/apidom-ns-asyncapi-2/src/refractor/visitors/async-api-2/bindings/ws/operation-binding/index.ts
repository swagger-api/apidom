import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketOperationBindingElement from '../../../../../../elements/bindings/ws/WebSocketOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface WebSocketOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class WebSocketOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: WebSocketOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketOperationBindingVisitor) {
    super(options);
    this.element = new WebSocketOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketOperationBindingVisitor;
