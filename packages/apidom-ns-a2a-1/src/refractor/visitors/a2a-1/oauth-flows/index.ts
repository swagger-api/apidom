import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowsElement from '../../../../elements/OAuthFlows.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface OAuthFlowsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OAuthFlowsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OAuthFlowsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OAuthFlows']>;

  constructor(options: OAuthFlowsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
    this.specPath = always(['document', 'objects', 'OAuthFlows']);
  }
}

export default OAuthFlowsVisitor;
