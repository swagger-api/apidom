import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ResponseElement from '../../../../elements/Response.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ResponseVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ResponseVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ResponseElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Response']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ResponseVisitorOptions) {
    super(options);
    this.element = new ResponseElement();
    this.specPath = always(['document', 'objects', 'Response']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ResponseVisitor;
