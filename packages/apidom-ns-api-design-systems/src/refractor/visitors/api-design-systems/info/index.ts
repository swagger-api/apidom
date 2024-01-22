import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import InfoElement from '../../../../elements/Info';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: InfoElement;

  constructor(options = {}) {
    super(options);
    this.specPath = always(['document', 'objects', 'Info']);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
