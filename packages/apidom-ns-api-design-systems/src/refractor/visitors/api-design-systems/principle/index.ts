import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import PrincipleElement from '../../../../elements/Principle';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class PrincipleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: PrincipleElement;

  constructor(options = {}) {
    super(options);
    this.specPath = always(['document', 'objects', 'Principle']);
    this.element = new PrincipleElement();
  }
}

export default PrincipleVisitor;
