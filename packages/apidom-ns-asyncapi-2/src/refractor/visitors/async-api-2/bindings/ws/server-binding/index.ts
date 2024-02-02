import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketServerBindingElement from '../../../../../../elements/bindings/ws/WebSocketServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class WebSocketServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: WebSocketServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new WebSocketServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketServerBindingVisitor;
