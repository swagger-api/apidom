import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AuthorizationCodeOAuthFlowElement from '../../../../elements/AuthorizationCodeOAuthFlow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AuthorizationCodeOAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AuthorizationCodeOAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AuthorizationCodeOAuthFlowElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'AuthorizationCodeOAuthFlow']
  >;

  constructor(options: AuthorizationCodeOAuthFlowVisitorOptions) {
    super(options);
    this.element = new AuthorizationCodeOAuthFlowElement();
    this.specPath = always(['document', 'objects', 'AuthorizationCodeOAuthFlow']);
  }
}

export default AuthorizationCodeOAuthFlowVisitor;
