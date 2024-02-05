import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5MessageBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5MessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface Mqtt5MessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Mqtt5MessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Mqtt5MessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5MessageBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5MessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5MessageBindingVisitor;
