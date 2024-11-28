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
  declare public readonly element: HeadersElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Header']>;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: HeadersVisitorOptions) {
    super(options);
    this.element = new HeadersElement();
    this.specPath = always(['document', 'objects', 'Header']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default HeadersVisitor;
