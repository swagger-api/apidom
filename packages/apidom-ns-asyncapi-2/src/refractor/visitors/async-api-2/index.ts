import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import AsyncApi2Element from '../../../elements/AsyncApi2.ts';

/**
 * @public
 */
export interface AsyncApi2VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AsyncApi2Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: AsyncApi2Element;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'AsyncApi']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: AsyncApi2VisitorOptions) {
    super(options);
    this.element = new AsyncApi2Element();
    this.specPath = always(['document', 'objects', 'AsyncApi']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default AsyncApi2Visitor;
