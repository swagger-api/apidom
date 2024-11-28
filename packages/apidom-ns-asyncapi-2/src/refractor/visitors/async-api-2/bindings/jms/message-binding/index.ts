import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsMessageBindingElement from '../../../../../../elements/bindings/jms/JmsMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface JmsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JmsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: JmsMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsMessageBindingVisitorOptions) {
    super(options);
    this.element = new JmsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsMessageBindingVisitor;
