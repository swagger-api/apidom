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
  declare public readonly element: SqsChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sqs', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: SqsChannelBindingVisitorOptions) {
    super(options);
    this.element = new SqsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sqs', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SqsChannelBindingVisitor;
