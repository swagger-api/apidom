import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpMessageBindingElement from '../../../../../../elements/bindings/http/HttpMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface HttpMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class HttpMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HttpMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpMessageBindingVisitorOptions) {
    super(options);
    this.element = new HttpMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpMessageBindingVisitor;
