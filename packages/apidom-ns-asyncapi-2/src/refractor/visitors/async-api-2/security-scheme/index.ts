import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecuritySchemeElement from '../../../../elements/SecurityScheme';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class SecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SecuritySchemeElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SecuritySchemeVisitor;
