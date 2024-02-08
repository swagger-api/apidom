import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsOperationBindingElement from '../../../../../../elements/bindings/nats/NatsOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface NatsOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class NatsOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsOperationBindingVisitorOptions) {
    super(options);
    this.element = new NatsOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsOperationBindingVisitor;
