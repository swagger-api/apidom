import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, StringElement, toValue } from '@swagger-api/apidom-core';
import {
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-1';

import PathItemElement from '../../../elements/PathItem.ts';
import WebhooksElement from '../../../elements/nces/Webhooks.ts';
import { isPathItemElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface WebhooksVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class WebhooksVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: WebhooksElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  constructor(options: WebhooksVisitorOptions) {
    super(options);
    this.element = new WebhooksElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

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
