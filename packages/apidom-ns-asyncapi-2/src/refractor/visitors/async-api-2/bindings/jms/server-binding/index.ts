import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsServerBindingElement from '../../../../../../elements/bindings/jms/JmsServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface JmsServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JmsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: JmsServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsServerBindingVisitorOptions) {
    super(options);
    this.element = new JmsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsServerBindingVisitor;
