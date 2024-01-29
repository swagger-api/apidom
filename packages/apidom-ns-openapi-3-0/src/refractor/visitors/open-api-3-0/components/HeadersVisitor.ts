import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsHeadersElement from '../../../../elements/nces/ComponentsHeaders';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isHeaderElement } from '../../../../predicates';

class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsHeadersElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Header']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ComponentsHeadersElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Header'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'header');
    });

    // decorate every HeaderElement with metadata about their name
    // @ts-ignore
    this.element.filter(isHeaderElement).forEach((value: Element, key: StringElement) => {
      value.setMetaProperty('header-name', toValue(key));
    });

    return result;
  }
}

export default HeadersVisitor;
