import { Mixin } from 'ts-mixer';
import { ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../elements/Reference';
import PathItemElement from '../../../elements/PathItem';
import WebhooksElement from '../../../elements/nces/Webhooks';
import { isPathItemElement, isReferenceElement } from '../../../predicates';

class WebhooksVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: WebhooksElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'PathItem']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new WebhooksElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'pathItem');
    });

    // decorate every PathItemElement with Webhook name metadata
    this.element
      .filter(isPathItemElement)
      // @ts-ignore
      .forEach((pathItemElement: PathItemElement, key: StringElement) => {
        // @ts-ignore
        pathItemElement.setMetaProperty('webhook-name', toValue(key));
      });

    return result;
  }
}

export default WebhooksVisitor;
