import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import AsyncApi3Element from '../../../elements/AsyncApi3.ts';

/**
 * @public
 */
export interface AsyncApi3VisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AsyncApi3Visitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AsyncApi3Element;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AsyncApi']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: AsyncApi3VisitorOptions) {
    super(options);
    this.element = new AsyncApi3Element();
    this.specPath = always(['document', 'objects', 'AsyncApi']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default AsyncApi3Visitor;
