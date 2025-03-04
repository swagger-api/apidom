import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AnypointmqServerBindingElement from '../../../../../../elements/bindings/anypointmq/AnypointmqServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface AnypointmqServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AnypointmqServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AnypointmqServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'anypointmq', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: AnypointmqServerBindingVisitorOptions) {
    super(options);
    this.element = new AnypointmqServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'anypointmq', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default AnypointmqServerBindingVisitor;
