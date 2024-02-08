import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarServerBindingElement from '../../../../../../elements/bindings/pulsar/PulsarServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface PulsarServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class PulsarServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PulsarServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: PulsarServerBindingVisitorOptions) {
    super(options);
    this.element = new PulsarServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarServerBindingVisitor;
