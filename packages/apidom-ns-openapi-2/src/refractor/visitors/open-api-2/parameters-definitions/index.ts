import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ParametersDefinitionsElement from '../../../../elements/ParametersDefinitions';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ParametersDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

class ParametersDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ParametersDefinitionsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  constructor(options: ParametersDefinitionsVisitorOptions) {
    super(options);
    this.element = new ParametersDefinitionsElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
  }
}

export default ParametersDefinitionsVisitor;
