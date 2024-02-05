import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowsElement from '../../../../elements/OAuthFlows';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface OAuthFlowsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class OAuthFlowsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OAuthFlowsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'OAuthFlows']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: OAuthFlowsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
    this.specPath = always(['document', 'objects', 'OAuthFlows']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OAuthFlowsVisitor;
