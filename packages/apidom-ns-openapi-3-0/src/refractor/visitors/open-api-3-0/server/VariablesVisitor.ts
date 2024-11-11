import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ServerVariablesElement from '../../../../elements/nces/ServerVariables.ts';

export interface VariablesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ServerVariablesElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ServerVariable']>;

  constructor(options: VariablesVisitorOptions) {
    super(options);
    this.element = new ServerVariablesElement();
    this.specPath = always(['document', 'objects', 'ServerVariable']);
  }
}

export default VariablesVisitor;
