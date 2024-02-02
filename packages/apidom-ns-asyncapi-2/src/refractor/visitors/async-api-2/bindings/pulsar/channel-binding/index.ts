import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PulsarChannelBindingElement from '../../../../../../elements/bindings/pulsar/PulsarChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class PulsarChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'pulsar', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PulsarChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'pulsar', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default PulsarChannelBindingVisitor;
