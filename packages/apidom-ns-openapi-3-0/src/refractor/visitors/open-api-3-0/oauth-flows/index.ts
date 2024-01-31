import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowsElement from '../../../../elements/OAuthFlows';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class OAuthFlowsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: OAuthFlowsElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'OAuthFlows']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
    this.specPath = always(['document', 'objects', 'OAuthFlows']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OAuthFlowsVisitor;
