import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  ResponseContentElement,
  MapVisitor,
  MapVisitorOptions,
  SpecPath,
  FallbackVisitor,
  FallbackVisitorOptions,
  isReferenceLikeElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ContentVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ContentVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ResponseContentElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'MediaType'] | ['document', 'objects', 'Reference']
  >;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ResponseContentElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'MediaType'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'mediaType');
    });

    return result;
  }
}

export default ContentVisitor;
