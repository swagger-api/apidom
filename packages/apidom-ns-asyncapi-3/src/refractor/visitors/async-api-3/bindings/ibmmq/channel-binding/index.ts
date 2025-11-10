import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import IbmmqChannelBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface IbmmqChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class IbmmqChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: IbmmqChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'ibmmq', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: IbmmqChannelBindingVisitorOptions) {
    super(options);
    this.element = new IbmmqChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'ibmmq', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default IbmmqChannelBindingVisitor;
