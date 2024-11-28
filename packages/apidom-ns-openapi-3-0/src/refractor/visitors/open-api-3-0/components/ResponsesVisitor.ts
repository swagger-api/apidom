import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsResponsesElement from '../../../../elements/nces/ComponentsResponses.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement, isResponseElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ResponsesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ResponsesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsResponsesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Response']
  >;

  constructor(options: ResponsesVisitorOptions) {
    super(options);
    this.element = new ComponentsResponsesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'response');
    });

    // decorate every ResponseElement with metadata about their status code
    // @ts-ignore
    this.element.filter(isResponseElement).forEach((value: Element, key: StringElement) => {
      value.setMetaProperty('http-status-code', toValue(key));
    });

    return result;
  }
}

export default ResponsesVisitor;
