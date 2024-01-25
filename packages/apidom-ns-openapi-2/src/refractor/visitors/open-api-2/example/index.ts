import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExampleElement from '../../../../elements/Example';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';

class ExampleVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ExampleElement;

  protected declare readonly specPath: SpecPath<['value']>;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
    this.specPath = always(['value']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default ExampleVisitor;
