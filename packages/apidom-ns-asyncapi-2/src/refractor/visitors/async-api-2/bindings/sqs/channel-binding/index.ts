import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsChannelBindingElement from '../../../../../../elements/bindings/sqs/SqsChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface SqsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class SqsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SqsChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsChannelBindingVisitorOptions) {
    super(options);
    this.element = new SqsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsChannelBindingVisitor;
