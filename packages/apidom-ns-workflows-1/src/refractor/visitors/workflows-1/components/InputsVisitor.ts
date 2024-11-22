import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsInputsElement from '../../../../elements/nces/ComponentsInputs.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface InputsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
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
