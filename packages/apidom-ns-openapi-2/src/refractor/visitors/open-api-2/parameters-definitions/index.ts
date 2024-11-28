import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ParametersDefinitionsElement from '../../../../elements/ParametersDefinitions.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ParametersDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ParametersDefinitionsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  constructor(options: ParametersDefinitionsVisitorOptions) {
    super(options);
    this.element = new ParametersDefinitionsElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
  }
}

export default ParametersDefinitionsVisitor;
