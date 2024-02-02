import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowElement from '../../../../elements/OAuthFlow';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class OAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OAuthFlowElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'OAuthFlow']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
    this.specPath = always(['document', 'objects', 'OAuthFlow']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OAuthFlowVisitor;
