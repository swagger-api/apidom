import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketServerBindingElement from '../../../../../../elements/bindings/ws/WebSocketServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface WebSocketServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class WebSocketServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: WebSocketServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketServerBindingVisitorOptions) {
    super(options);
    this.element = new WebSocketServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketServerBindingVisitor;
