import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsCorrelationIDsElement from '../../../../elements/nces/ComponentsCorrelationIDs.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export interface CorrelationIdsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class CorrelationIdsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsCorrelationIDsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'CorrelationID']
  >;

  constructor(options: CorrelationIdsVisitorOptions) {
    super(options);
    this.element = new ComponentsCorrelationIDsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'CorrelationID'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'correlationID');
    });

    return result;
  }
}

export default CorrelationIdsVisitor;
