import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5ServerBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

export interface Mqtt5ServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class Mqtt5ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: Mqtt5ServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5ServerBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5ServerBindingVisitor;
