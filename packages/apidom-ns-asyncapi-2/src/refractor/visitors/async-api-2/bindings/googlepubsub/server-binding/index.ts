import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubServerBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface GooglepubsubServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class GooglepubsubServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: GooglepubsubServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: GooglepubsubServerBindingVisitorOptions) {
    super(options);
    this.element = new GooglepubsubServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubServerBindingVisitor;
