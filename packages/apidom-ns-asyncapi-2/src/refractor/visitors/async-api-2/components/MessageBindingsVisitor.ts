import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsMessageBindingsElement from '../../../../elements/nces/ComponentsMessageBindings.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export interface MessageBindingsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class MessageBindingsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare element: ComponentsMessageBindingsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'MessageBindings']
  >;

  constructor(options: MessageBindingsVisitorOptions) {
    super(options);
    this.element = new ComponentsMessageBindingsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'MessageBindings'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'messageBindings');
    });

    return result;
  }
}

export default MessageBindingsVisitor;
