import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqOperationBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class AnypointmqOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AnypointmqOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new AnypointmqOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqOperationBindingVisitor;
