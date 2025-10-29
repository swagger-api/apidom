import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqMessageBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface IbmmqMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class IbmmqMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: IbmmqMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: IbmmqMessageBindingVisitorOptions) {
    super(options);
    this.element = new IbmmqMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqMessageBindingVisitor;
