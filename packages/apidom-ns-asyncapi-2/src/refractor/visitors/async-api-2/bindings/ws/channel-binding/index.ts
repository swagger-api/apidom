import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketChannelBindingElement from '../../../../../../elements/bindings/ws/WebSocketChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface WebSocketChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class WebSocketChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: WebSocketChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketChannelBindingVisitorOptions) {
    super(options);
    this.element = new WebSocketChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketChannelBindingVisitor;
