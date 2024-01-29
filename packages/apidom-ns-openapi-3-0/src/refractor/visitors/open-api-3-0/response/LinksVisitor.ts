import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponseLinksElement from '../../../../elements/nces/ResponseLinks';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ResponseLinksElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Link']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ResponseLinksElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Link'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'link');
    });

    return result;
  }
}

export default HeadersVisitor;
