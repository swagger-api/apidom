import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubChannelBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface GooglepubsubChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class GooglepubsubChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: GooglepubsubChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: GooglepubsubChannelBindingVisitorOptions) {
    super(options);
    this.element = new GooglepubsubChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubChannelBindingVisitor;
