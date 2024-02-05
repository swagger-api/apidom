import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompServerBindingElement from '../../../../../../elements/bindings/stomp/StompServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface StompServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class StompServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StompServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: StompServerBindingVisitorOptions) {
    super(options);
    this.element = new StompServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompServerBindingVisitor;
