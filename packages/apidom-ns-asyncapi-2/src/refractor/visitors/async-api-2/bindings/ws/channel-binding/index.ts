import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketChannelBindingElement from '../../../../../../elements/bindings/ws/WebSocketChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface WebSocketChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class WebSocketChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: WebSocketChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketChannelBindingVisitorOptions) {
    super(options);
    this.element = new WebSocketChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketChannelBindingVisitor;
