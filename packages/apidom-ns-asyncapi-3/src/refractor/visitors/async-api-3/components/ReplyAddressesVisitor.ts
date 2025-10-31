import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceElement, isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import ComponentsReplyAddressesElement from '../../../../elements/nces/ComponentsReplyAddresses.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ReplyAddressesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ReplyAddressesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsReplyAddressesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'OperationReplyAddress']
  >;

  constructor(options: ReplyAddressesVisitorOptions) {
    super(options);
    this.element = new ComponentsReplyAddressesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'OperationReplyAddress'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'operation-reply-address');
    });

    return result;
  }
}

export default ReplyAddressesVisitor;
