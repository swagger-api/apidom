import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsMessageBindingElement from '../../../../../../elements/bindings/jms/JmsMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface JmsMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class JmsMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: JmsMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: JmsMessageBindingVisitorOptions) {
    super(options);
    this.element = new JmsMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsMessageBindingVisitor;
