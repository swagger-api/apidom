import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaTypeEncodingElement from '../../../../elements/nces/MediaTypeEncoding.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface EncodingVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class EncodingVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: MediaTypeEncodingElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Encoding']>;

  constructor(options: EncodingVisitorOptions) {
    super(options);
    this.element = new MediaTypeEncodingElement();
    this.specPath = always(['document', 'objects', 'Encoding']);
  }
}

export default EncodingVisitor;
