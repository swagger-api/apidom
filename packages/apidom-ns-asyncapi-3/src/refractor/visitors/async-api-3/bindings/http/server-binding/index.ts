import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpServerBindingElement from '../../../../../../elements/bindings/http/HttpServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface HttpServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class HttpServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HttpServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpServerBindingVisitorOptions) {
    super(options);
    this.element = new HttpServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpServerBindingVisitor;
