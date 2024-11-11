import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsCallbacksElement from '../../../../elements/nces/ComponentsCallbacks.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export interface CallbackVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class CallbacksVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsCallbacksElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Callback']
  >;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new ComponentsCallbacksElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Callback'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'callback');
    });

    return result;
  }
}

export default CallbacksVisitor;
