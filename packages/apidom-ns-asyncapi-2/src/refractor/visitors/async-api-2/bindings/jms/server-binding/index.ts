import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import JmsServerBindingElement from '../../../../../../elements/bindings/jms/JmsServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class JmsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: JmsServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'jms', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new JmsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'jms', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default JmsServerBindingVisitor;
