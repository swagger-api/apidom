import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqChannelBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AnypointmqChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AnypointmqChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AnypointmqChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AnypointmqChannelBindingVisitorOptions) {
    super(options);
    this.element = new AnypointmqChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqChannelBindingVisitor;
