import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import GooglepubsubOperationBindingElement from '../../../../../../elements/bindings/googlepubsub/GooglepubsubOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface GooglepubsubOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class GooglepubsubOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: GooglepubsubOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: GooglepubsubOperationBindingVisitorOptions) {
    super(options);
    this.element = new GooglepubsubOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'googlepubsub', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default GooglepubsubOperationBindingVisitor;
