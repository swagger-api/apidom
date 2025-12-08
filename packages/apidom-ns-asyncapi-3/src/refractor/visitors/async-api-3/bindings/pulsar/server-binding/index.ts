import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarServerBindingElement from '../../../../../../elements/bindings/pulsar/PulsarServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface PulsarServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PulsarServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: PulsarServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: PulsarServerBindingVisitorOptions) {
    super(options);
    this.element = new PulsarServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarServerBindingVisitor;
