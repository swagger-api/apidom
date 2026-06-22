import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ClientCredentialsOAuthFlowElement from '../../../../elements/ClientCredentialsOAuthFlow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface ClientCredentialsOAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ClientCredentialsOAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ClientCredentialsOAuthFlowElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'ClientCredentialsOAuthFlow']
  >;

  constructor(options: ClientCredentialsOAuthFlowVisitorOptions) {
    super(options);
    this.element = new ClientCredentialsOAuthFlowElement();
    this.specPath = always(['document', 'objects', 'ClientCredentialsOAuthFlow']);
  }
}

export default ClientCredentialsOAuthFlowVisitor;
