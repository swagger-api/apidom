import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarMessageBindingElement from '../../../../../../elements/bindings/pulsar/PulsarMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface PulsarMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PulsarMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: PulsarMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: PulsarMessageBindingVisitorOptions) {
    super(options);
    this.element = new PulsarMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarMessageBindingVisitor;
