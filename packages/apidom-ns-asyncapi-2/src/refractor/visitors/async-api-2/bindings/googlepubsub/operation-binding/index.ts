import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubOperationBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class GooglepubsubOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: GooglepubsubOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new GooglepubsubOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubOperationBindingVisitor;
