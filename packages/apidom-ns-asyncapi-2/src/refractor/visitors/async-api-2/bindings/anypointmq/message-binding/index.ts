import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqMessageBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface AnypointmqMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class AnypointmqMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AnypointmqMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: AnypointmqMessageBindingVisitorOptions) {
    super(options);
    this.element = new AnypointmqMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqMessageBindingVisitor;
