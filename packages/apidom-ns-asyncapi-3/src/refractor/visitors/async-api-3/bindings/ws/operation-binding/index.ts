import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WebSocketOperationBindingElement from '../../../../../../elements/bindings/ws/WebSocketOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface WebSocketOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class WebSocketOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: WebSocketOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ws', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: WebSocketOperationBindingVisitor) {
    super(options);
    this.element = new WebSocketOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ws', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default WebSocketOperationBindingVisitor;
