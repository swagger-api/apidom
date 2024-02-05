import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsMessagesElement from '../../../../elements/nces/ComponentsMessages';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface MessagesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class MessagesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsMessagesElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Message']
  >;

  constructor(options: MessagesVisitorOptions) {
    super(options);
    this.element = new ComponentsMessagesElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Message'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'message');
    });

    return result;
  }
}

export default MessagesVisitor;
