import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface SecurityRequirementVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityRequirementVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: SecurityRequirementElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'SecurityRequirement']>;

  constructor(options: SecurityRequirementVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
    this.specPath = always(['document', 'objects', 'SecurityRequirement']);
  }
}

export default SecurityRequirementVisitor;
