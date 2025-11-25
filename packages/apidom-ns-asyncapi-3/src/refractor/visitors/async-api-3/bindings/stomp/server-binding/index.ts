import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompServerBindingElement from '../../../../../../elements/bindings/stomp/StompServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface StompServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class StompServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StompServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: StompServerBindingVisitorOptions) {
    super(options);
    this.element = new StompServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompServerBindingVisitor;
