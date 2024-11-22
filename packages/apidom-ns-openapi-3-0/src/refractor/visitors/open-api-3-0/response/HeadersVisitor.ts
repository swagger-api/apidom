import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ResponseHeadersElement from '../../../../elements/nces/ResponseHeaders.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isHeaderElement, isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface HeadersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
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
