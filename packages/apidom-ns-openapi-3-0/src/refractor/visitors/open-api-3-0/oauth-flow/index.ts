import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowElement from '../../../../elements/OAuthFlow.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface OAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OAuthFlowElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OAuthFlow']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: OAuthFlowVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
    this.specPath = always(['document', 'objects', 'OAuthFlow']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OAuthFlowVisitor;
