import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsRequestBodiesElement from '../../../../elements/nces/ComponentsRequestBodies';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

class RequestBodiesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsRequestBodiesElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'RequestBody']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ComponentsRequestBodiesElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'RequestBody'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'requestBody');
    });

    return result;
  }
}

export default RequestBodiesVisitor;
