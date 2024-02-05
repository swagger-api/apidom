import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubServerBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface GooglepubsubServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class GooglepubsubServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: GooglepubsubServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: GooglepubsubServerBindingVisitorOptions) {
    super(options);
    this.element = new GooglepubsubServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubServerBindingVisitor;
