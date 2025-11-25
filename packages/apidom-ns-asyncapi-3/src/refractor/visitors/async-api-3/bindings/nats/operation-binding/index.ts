import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsOperationBindingElement from '../../../../../../elements/bindings/nats/NatsOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface NatsOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class NatsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: NatsOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsOperationBindingVisitorOptions) {
    super(options);
    this.element = new NatsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsOperationBindingVisitor;
