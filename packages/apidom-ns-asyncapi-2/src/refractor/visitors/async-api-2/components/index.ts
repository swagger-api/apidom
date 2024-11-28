import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsElement from '../../../../elements/Components.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ComponentsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ComponentsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Components']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ComponentsVisitorOptions) {
    super(options);
    this.element = new ComponentsElement();
    this.specPath = always(['document', 'objects', 'Components']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ComponentsVisitor;
