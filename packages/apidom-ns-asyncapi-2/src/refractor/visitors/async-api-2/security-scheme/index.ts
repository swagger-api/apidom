import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecuritySchemeElement from '../../../../elements/SecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface SecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SecuritySchemeElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: SecuritySchemeVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SecuritySchemeVisitor;
