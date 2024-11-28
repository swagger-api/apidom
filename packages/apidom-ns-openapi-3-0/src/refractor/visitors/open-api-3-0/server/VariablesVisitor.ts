import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ServerVariablesElement from '../../../../elements/nces/ServerVariables.ts';

/**
 * @public
 */
export interface VariablesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ServerVariablesElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ServerVariable']>;

  constructor(options: VariablesVisitorOptions) {
    super(options);
    this.element = new ServerVariablesElement();
    this.specPath = always(['document', 'objects', 'ServerVariable']);
  }
}

export default VariablesVisitor;
