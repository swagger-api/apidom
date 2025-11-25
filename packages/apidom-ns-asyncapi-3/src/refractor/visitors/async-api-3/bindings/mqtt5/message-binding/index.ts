import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5MessageBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5MessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Mqtt5MessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Mqtt5MessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Mqtt5MessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5MessageBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5MessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5MessageBindingVisitor;
