import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarServerBindingElement from '../../../../../../elements/bindings/pulsar/PulsarServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class PulsarServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PulsarServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PulsarServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarServerBindingVisitor;
