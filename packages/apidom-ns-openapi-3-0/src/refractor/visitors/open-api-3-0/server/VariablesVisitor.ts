import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ServerVariablesElement from '../../../../elements/nces/ServerVariables';

class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ServerVariablesElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'ServerVariable']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ServerVariablesElement();
    this.specPath = always(['document', 'objects', 'ServerVariable']);
  }
}

export default VariablesVisitor;
