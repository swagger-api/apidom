import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';

export type { MapVisitorOptions as ContentVisitorOptions };

class ContentVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ObjectElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'MediaType']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('content');
    this.specPath = always(['document', 'objects', 'MediaType']);
  }
}

export default ContentVisitor;
