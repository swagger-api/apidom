import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqServerBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AnypointmqServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AnypointmqServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AnypointmqServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqServerBindingVisitor;
