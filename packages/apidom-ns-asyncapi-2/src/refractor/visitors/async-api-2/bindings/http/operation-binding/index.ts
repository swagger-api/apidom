import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpOperationBindingElement from '../../../../../../elements/bindings/http/HttpOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface HttpOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class HttpOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: HttpOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpOperationBindingVisitorOptions) {
    super(options);
    this.element = new HttpOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpOperationBindingVisitor;
