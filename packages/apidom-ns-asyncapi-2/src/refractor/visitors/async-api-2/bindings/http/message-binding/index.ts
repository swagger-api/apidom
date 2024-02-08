import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpMessageBindingElement from '../../../../../../elements/bindings/http/HttpMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface HttpMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class HttpMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: HttpMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpMessageBindingVisitorOptions) {
    super(options);
    this.element = new HttpMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpMessageBindingVisitor;
