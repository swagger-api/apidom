import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarMessageBindingElement from '../../../../../../elements/bindings/pulsar/PulsarMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class PulsarMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PulsarMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PulsarMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarMessageBindingVisitor;
