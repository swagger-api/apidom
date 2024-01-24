import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsInputsElement from '../../../../elements/nces/ComponentsInputs';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class InputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsInputsElement;

  constructor(options = {}) {
    super(options);
    this.element = new ComponentsInputsElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }
}

export default InputsVisitor;
