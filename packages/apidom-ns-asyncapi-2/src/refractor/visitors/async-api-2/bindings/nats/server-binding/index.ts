import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsServerBindingElement from '../../../../../../elements/bindings/nats/NatsServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface NatsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class NatsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: NatsServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsServerBindingVisitorOptions) {
    super(options);
    this.element = new NatsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsServerBindingVisitor;
