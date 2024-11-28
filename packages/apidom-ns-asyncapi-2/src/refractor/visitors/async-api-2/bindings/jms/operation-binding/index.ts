import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsOperationBindingElement from '../../../../../../elements/bindings/jms/JmsOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface JmsOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JmsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: JmsOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsOperationBindingVisitorOptions) {
    super(options);
    this.element = new JmsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsOperationBindingVisitor;
