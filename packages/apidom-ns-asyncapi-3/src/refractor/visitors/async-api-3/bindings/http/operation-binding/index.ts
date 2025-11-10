import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpOperationBindingElement from '../../../../../../elements/bindings/http/HttpOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface HttpOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class HttpOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HttpOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpOperationBindingVisitorOptions) {
    super(options);
    this.element = new HttpOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpOperationBindingVisitor;
