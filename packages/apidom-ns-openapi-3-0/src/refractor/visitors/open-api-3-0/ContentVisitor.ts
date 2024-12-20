import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface ContentVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ContentVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MediaType']>;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('content');
    this.specPath = always(['document', 'objects', 'MediaType']);
  }
}

export default ContentVisitor;
