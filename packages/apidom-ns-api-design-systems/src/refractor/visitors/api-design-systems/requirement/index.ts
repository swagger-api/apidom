import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import RequirementElement from '../../../../elements/Requirement.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface RequirementVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RequirementVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RequirementElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Requirement']>;

  constructor(options: RequirementVisitorOptions) {
    super(options);
    this.element = new RequirementElement();
    this.specPath = always(['document', 'objects', 'Requirement']);
  }
}

export default RequirementVisitor;
