import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubMessageBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class GooglepubsubMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: GooglepubsubMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubusb', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new GooglepubsubMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubusb', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubMessageBindingVisitor;
