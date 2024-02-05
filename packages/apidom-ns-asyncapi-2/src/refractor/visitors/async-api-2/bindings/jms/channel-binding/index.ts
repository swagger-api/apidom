import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsChannelBindingElement from '../../../../../../elements/bindings/jms/JmsChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface JmsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class JmsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: JmsChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsChannelBindingVisitorOptions) {
    super(options);
    this.element = new JmsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsChannelBindingVisitor;
