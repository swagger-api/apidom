import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsMessageTraitsElement from '../../../../elements/nces/ComponentsMessageTraits';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface MessageTraitsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class MessageTraitsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsMessageTraitsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'MessageTrait']
  >;

  constructor(options: MessageTraitsVisitorOptions) {
    super(options);
    this.element = new ComponentsMessageTraitsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'MessageTrait'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'messageTrait');
    });

    return result;
  }
}

export default MessageTraitsVisitor;
