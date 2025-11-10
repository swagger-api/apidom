import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqMessageBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AnypointmqMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AnypointmqMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AnypointmqMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AnypointmqMessageBindingVisitorOptions) {
    super(options);
    this.element = new AnypointmqMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqMessageBindingVisitor;
