import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SourceDescriptionElement from '../../../../elements/SourceDescription';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class SourceDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SourceDescriptionElement;

  constructor(options = {}) {
    super(options);
    this.element = new SourceDescriptionElement();
    this.specPath = always(['document', 'objects', 'SourceDescription']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SourceDescriptionVisitor;
