import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsMessageBindingElement from '../../../../../../elements/bindings/sns/SnsMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SnsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SnsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SnsMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SnsMessageBindingVisitorOptions) {
    super(options);
    this.element = new SnsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsMessageBindingVisitor;
