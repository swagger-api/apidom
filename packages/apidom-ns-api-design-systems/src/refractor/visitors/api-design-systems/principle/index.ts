import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import PrincipleElement from '../../../../elements/Principle';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, { FixedFieldsVisitorOptions } from '../../generics/FixedFieldsVisitor';

class PrincipleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PrincipleElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Principle']);
    this.element = new PrincipleElement();
  }
}

export default PrincipleVisitor;
