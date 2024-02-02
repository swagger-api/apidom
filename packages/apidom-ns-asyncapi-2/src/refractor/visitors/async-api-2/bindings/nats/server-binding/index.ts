import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsServerBindingElement from '../../../../../../elements/bindings/nats/NatsServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class NatsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new NatsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsServerBindingVisitor;
