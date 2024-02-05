import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpServerBindingElement from '../../../../../../elements/bindings/http/HttpServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface HttpServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class HttpServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: HttpServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpServerBindingVisitorOptions) {
    super(options);
    this.element = new HttpServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpServerBindingVisitor;
