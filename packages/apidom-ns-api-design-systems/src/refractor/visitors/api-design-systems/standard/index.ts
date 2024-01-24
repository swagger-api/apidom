import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import StandardElement from '../../../../elements/Standard';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, { FixedFieldsVisitorOptions } from '../../generics/FixedFieldsVisitor';

class StandardVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StandardElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Standard']);
    this.element = new StandardElement();
  }
}

export default StandardVisitor;
