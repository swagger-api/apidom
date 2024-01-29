import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaTypeEncodingElement from '../../../../elements/nces/MediaTypeEncoding';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class EncodingVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: MediaTypeEncodingElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Encoding']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new MediaTypeEncodingElement();
    this.specPath = always(['document', 'objects', 'Encoding']);
  }
}

export default EncodingVisitor;
