import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqOperationBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface IbmmqOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class IbmmqOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: IbmmqOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: IbmmqOperationBindingVisitorOptions) {
    super(options);
    this.element = new IbmmqOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqOperationBindingVisitor;
