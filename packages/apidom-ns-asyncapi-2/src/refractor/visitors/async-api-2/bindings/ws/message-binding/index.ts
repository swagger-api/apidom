import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketMessageBindingElement from '../../../../../../elements/bindings/ws/WebSocketMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface WebSocketMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class WebSocketMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: WebSocketMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketMessageBindingVisitorOptions) {
    super(options);
    this.element = new WebSocketMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketMessageBindingVisitor;
