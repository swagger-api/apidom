import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import HeadersElement from '../../../../elements/Headers.ts';

/**
 * @public
 */
export interface HeadersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: HeadersElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Header']>;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: HeadersVisitorOptions) {
    super(options);
    this.element = new HeadersElement();
    this.specPath = always(['document', 'objects', 'Header']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HeadersVisitor;
