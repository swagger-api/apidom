import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5ServerBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class Mqtt5ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Mqtt5ServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new Mqtt5ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5ServerBindingVisitor;
