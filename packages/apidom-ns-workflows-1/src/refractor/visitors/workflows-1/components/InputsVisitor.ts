import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsInputsElement from '../../../../elements/nces/ComponentsInputs';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface InputsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class InputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsInputsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: InputsVisitorOptions) {
    super(options);
    this.element = new ComponentsInputsElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }
}

export default InputsVisitor;
