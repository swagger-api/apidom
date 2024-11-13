import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsServerBindingElement from '../../../../../../elements/bindings/nats/NatsServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

export interface NatsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class NatsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsServerBindingVisitorOptions) {
    super(options);
    this.element = new NatsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsServerBindingVisitor;
