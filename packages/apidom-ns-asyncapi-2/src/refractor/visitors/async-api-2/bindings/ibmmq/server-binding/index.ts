import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqServerBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface IbmmqServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class IbmmqServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: IbmmqServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: IbmmqServerBindingVisitorOptions) {
    super(options);
    this.element = new IbmmqServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqServerBindingVisitor;
