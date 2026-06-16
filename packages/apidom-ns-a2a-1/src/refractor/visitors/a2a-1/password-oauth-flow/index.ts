import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import PasswordOAuthFlowElement from '../../../../elements/PasswordOAuthFlow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface PasswordOAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PasswordOAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: PasswordOAuthFlowElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'PasswordOAuthFlow']>;

  constructor(options: PasswordOAuthFlowVisitorOptions) {
    super(options);
    this.element = new PasswordOAuthFlowElement();
    this.specPath = always(['document', 'objects', 'PasswordOAuthFlow']);
  }
}

export default PasswordOAuthFlowVisitor;
