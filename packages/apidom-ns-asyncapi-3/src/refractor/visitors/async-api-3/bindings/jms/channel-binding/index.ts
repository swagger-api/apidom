import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsChannelBindingElement from '../../../../../../elements/bindings/jms/JmsChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface JmsChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JmsChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: JmsChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsChannelBindingVisitorOptions) {
    super(options);
    this.element = new JmsChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsChannelBindingVisitor;
