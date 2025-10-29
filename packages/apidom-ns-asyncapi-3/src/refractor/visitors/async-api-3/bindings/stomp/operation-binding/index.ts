import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompOperationBindingElement from '../../../../../../elements/bindings/stomp/StompOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface StompOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class StompOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StompOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: StompOperationBindingVisitorOptions) {
    super(options);
    this.element = new StompOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompOperationBindingVisitor;
