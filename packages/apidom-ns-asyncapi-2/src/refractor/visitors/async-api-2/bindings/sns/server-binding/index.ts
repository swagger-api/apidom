import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsServerBindingElement from '../../../../../../elements/bindings/sns/SnsServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SnsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SnsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SnsServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SnsServerBindingVisitorOptions) {
    super(options);
    this.element = new SnsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsServerBindingVisitor;
