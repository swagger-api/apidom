import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';

/**
 * @public
 */
export interface ExampleVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ExampleVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ExampleElement;

  declare protected readonly specPath: SpecPath<['value']>;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: ExampleVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
    this.specPath = always(['value']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default ExampleVisitor;
