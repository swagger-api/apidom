import { Mixin } from 'ts-mixer';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsResponsesElement from '../../../../elements/nces/ComponentsResponses';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isResponseElement } from '../../../../predicates';

class ResponsesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsResponsesElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Response']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ComponentsResponsesElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
    };
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
