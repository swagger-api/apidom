import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StompChannelBindingElement from '../../../../../../elements/bindings/stomp/StompChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface StompChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class StompChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StompChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'stomp', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: StompChannelBindingVisitorOptions) {
    super(options);
    this.element = new StompChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'stomp', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default StompChannelBindingVisitor;
