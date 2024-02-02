import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureServerBindingElement from '../../../../../../elements/bindings/mercure/MercureServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class MercureServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MercureServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MercureServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureServerBindingVisitor;
