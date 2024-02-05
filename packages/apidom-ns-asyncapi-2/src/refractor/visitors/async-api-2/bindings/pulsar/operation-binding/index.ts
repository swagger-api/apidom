import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarOperationBindingElement from '../../../../../../elements/bindings/pulsar/PulsarOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface PulsarOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class PulsarOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PulsarOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: PulsarOperationBindingVisitorOptions) {
    super(options);
    this.element = new PulsarOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarOperationBindingVisitor;
