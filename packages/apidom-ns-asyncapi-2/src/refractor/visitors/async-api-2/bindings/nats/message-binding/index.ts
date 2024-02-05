import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import NatsMessageBindingElement from '../../../../../../elements/bindings/nats/NatsMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface NatsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class NatsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: NatsMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'nats', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: NatsMessageBindingVisitorOptions) {
    super(options);
    this.element = new NatsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'nats', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default NatsMessageBindingVisitor;
