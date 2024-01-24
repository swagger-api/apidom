import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import InfoElement from '../../../../elements/Info';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, { FixedFieldsVisitorOptions } from '../../generics/FixedFieldsVisitor';

class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: InfoElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Info']);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
