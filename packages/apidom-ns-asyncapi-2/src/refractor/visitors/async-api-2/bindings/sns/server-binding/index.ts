import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SnsServerBindingElement from '../../../../../../elements/bindings/sns/SnsServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class SnsServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SnsServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'sns', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SnsServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'sns', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default SnsServerBindingVisitor;
