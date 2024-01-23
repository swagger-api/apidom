import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsElement from '../../../../elements/Components';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ComponentsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: ComponentsElement;

  constructor(options = {}) {
    super(options);
    this.element = new ComponentsElement();
    this.specPath = always(['document', 'objects', 'Components']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ComponentsVisitor;
