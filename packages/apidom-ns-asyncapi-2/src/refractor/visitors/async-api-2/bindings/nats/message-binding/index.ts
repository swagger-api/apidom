import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsMessageBindingElement from '../../../../../../elements/bindings/nats/NatsMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class NatsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new NatsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsMessageBindingVisitor;
