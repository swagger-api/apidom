import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';
import OperationCallbacksElement from '../../../../elements/nces/OperationCallbacks';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class CallbacksVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: OperationCallbacksElement;

  public readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Callback']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new OperationCallbacksElement();
    this.specPath = (element: unknown) =>
      // @ts-ignore
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
