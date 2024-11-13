import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompMessageBindingElement from '../../../../../../elements/bindings/stomp/StompMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

export interface StompMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class StompMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StompMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: StompMessageBindingVisitorOptions) {
    super(options);
    this.element = new StompMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompMessageBindingVisitor;
