import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HttpChannelBindingElement from '../../../../../../elements/bindings/http/HttpChannelBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface HttpChannelBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class HttpChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HttpChannelBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'http', 'ChannelBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: HttpChannelBindingVisitorOptions) {
    super(options);
    this.element = new HttpChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'http', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HttpChannelBindingVisitor;
