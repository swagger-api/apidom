import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpChannelBindingElement from '../../../../../../elements/bindings/http/HttpChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

export interface HttpChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class HttpChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: HttpChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpChannelBindingVisitorOptions) {
    super(options);
    this.element = new HttpChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpChannelBindingVisitor;
