import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsHeadersElement from '../../../../elements/nces/ComponentsHeaders.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement, isHeaderElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface HeadersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class HeadersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsHeadersElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Header']
  >;

  constructor(options: HeadersVisitorOptions) {
    super(options);
    this.element = new ComponentsHeadersElement();
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
    // @ts-ignore
    this.element.filter(isHeaderElement).forEach((value: Element, key: StringElement) => {
      value.setMetaProperty('header-name', toValue(key));
    });

    return result;
  }
}

export default HeadersVisitor;
