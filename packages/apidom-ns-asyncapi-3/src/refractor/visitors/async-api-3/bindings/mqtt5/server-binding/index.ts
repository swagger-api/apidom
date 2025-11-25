import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import Mqtt5ServerBindingElement from '../../../../../../elements/bindings/mqtt5/Mqtt5ServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface Mqtt5ServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class Mqtt5ServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: Mqtt5ServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: Mqtt5ServerBindingVisitorOptions) {
    super(options);
    this.element = new Mqtt5ServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mqtt5', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default Mqtt5ServerBindingVisitor;
