import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export interface ContentVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ContentVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ObjectElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'MediaType']>;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('content');
    this.specPath = always(['document', 'objects', 'MediaType']);
  }
}

export default ContentVisitor;
