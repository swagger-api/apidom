import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketMessageBindingElement from '../../../../../../elements/bindings/ws/WebSocketMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class WebSocketMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: WebSocketMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new WebSocketMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketMessageBindingVisitor;
