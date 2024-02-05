import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubChannelBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface GooglepubsubChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class GooglepubsubChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: GooglepubsubChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: GooglepubsubChannelBindingVisitorOptions) {
    super(options);
    this.element = new GooglepubsubChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubChannelBindingVisitor;
