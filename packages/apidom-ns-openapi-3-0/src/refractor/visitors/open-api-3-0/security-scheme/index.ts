import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecuritySchemeElement from '../../../../elements/SecurityScheme';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SecuritySchemeElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  public declare readonly canSupportSpecificationExtensions: boolean;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SecuritySchemeVisitor;
