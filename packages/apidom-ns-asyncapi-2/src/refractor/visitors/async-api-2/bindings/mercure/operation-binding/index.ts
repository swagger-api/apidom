import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureOperationBindingElement from '../../../../../../elements/bindings/mercure/MercureOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MercureOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MercureOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureOperationBindingVisitor;
