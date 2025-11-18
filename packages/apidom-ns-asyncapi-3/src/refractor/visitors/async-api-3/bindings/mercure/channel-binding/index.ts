import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureChannelBindingElement from '../../../../../../elements/bindings/mercure/MercureChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MercureChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MercureChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MercureChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MercureChannelBindingVisitorOptions) {
    super(options);
    this.element = new MercureChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureChannelBindingVisitor;
