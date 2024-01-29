import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsElement from '../../../../elements/Components';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ComponentsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Components']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ComponentsElement();
    this.specPath = always(['document', 'objects', 'Components']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ComponentsVisitor;
