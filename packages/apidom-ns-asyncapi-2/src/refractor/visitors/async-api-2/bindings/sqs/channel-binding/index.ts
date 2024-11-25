import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SqsChannelBindingElement from '../../../../../../elements/bindings/sqs/SqsChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SqsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
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
