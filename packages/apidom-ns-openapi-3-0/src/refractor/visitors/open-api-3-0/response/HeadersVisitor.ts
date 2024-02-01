import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponseHeadersElement from '../../../../elements/nces/ResponseHeaders';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isHeaderElement, isReferenceElement } from '../../../../predicates';

export interface HeadersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ResponseHeadersElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Header']
  >;

  constructor(options: HeadersVisitorOptions) {
    super(options);
    this.element = new ResponseHeadersElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Header'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'header');
    });

    // decorate every HeaderElement with metadata about their name
    this.element.forEach((value: Element, key: StringElement): void => {
      if (!isHeaderElement(value)) return;

      const headerName = toValue(key);

      value.setMetaProperty('header-name', headerName);
    });

    return result;
  }
}

export default HeadersVisitor;
