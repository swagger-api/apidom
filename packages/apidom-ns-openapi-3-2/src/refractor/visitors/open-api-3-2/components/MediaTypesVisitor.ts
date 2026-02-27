import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsMediaTypesElement from '../../../../elements/nces/ComponentsMediaTypes.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface MediaTypesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MediaTypesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsMediaTypesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'MediaType']
  >;

  constructor(options: MediaTypesVisitorOptions) {
    super(options);
    this.element = new ComponentsMediaTypesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'MediaType'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'mediaType');
    });

    return result;
  }
}

export default MediaTypesVisitor;
