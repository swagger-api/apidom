import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ImplicitOAuthFlowElement from '../../../../elements/ImplicitOAuthFlow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface ImplicitOAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ImplicitOAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ImplicitOAuthFlowElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ImplicitOAuthFlow']>;

  constructor(options: ImplicitOAuthFlowVisitorOptions) {
    super(options);
    this.element = new ImplicitOAuthFlowElement();
    this.specPath = always(['document', 'objects', 'ImplicitOAuthFlow']);
  }
}

export default ImplicitOAuthFlowVisitor;
