import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqChannelBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AnypointmqChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AnypointmqChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AnypointmqChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqChannelBindingVisitor;
