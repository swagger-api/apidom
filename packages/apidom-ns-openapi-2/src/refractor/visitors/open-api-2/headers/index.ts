import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import HeadersElement from '../../../../elements/Headers';

class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: HeadersElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Header']>;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new HeadersElement();
    this.specPath = always(['document', 'objects', 'Header']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HeadersVisitor;
