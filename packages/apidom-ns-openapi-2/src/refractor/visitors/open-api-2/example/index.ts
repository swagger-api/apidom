import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';

export interface ExampleVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ExampleVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ExampleElement;

  protected declare readonly specPath: SpecPath<['value']>;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: ExampleVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
    this.specPath = always(['value']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default ExampleVisitor;
