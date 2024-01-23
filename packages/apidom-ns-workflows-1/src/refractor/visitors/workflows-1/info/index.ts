import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import InfoElement from '../../../../elements/Info';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: InfoElement;

  constructor(options = {}) {
    super(options);
    this.element = new InfoElement();
    this.specPath = always(['document', 'objects', 'Info']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default InfoVisitor;
