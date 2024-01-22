import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MainElement from '../../../../elements/Main';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class MainVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: MainElement;

  constructor(options = {}) {
    super(options);
    this.specPath = always(['document', 'objects', 'Main']);
    this.element = new MainElement();
  }
}

export default MainVisitor;
