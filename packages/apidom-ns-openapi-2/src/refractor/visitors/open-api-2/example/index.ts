import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';

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
