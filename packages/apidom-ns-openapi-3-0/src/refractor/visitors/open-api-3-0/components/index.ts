import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsElement from '../../../../elements/Components.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export interface ComponentsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}
class ComponentsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Components']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ComponentsVisitorOptions) {
    super(options);
    this.element = new ComponentsElement();
    this.specPath = always(['document', 'objects', 'Components']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ComponentsVisitor;
