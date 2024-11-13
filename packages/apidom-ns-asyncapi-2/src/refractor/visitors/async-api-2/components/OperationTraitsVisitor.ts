import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsOperationTraitsElement from '../../../../elements/nces/ComponentsOperationTraits.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export interface OperationTraitsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class OperationTraitsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsOperationTraitsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'OperationTrait']
  >;

  constructor(options: OperationTraitsVisitorOptions) {
    super(options);
    this.element = new ComponentsOperationTraitsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'OperationTrait'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'operationTrait');
    });

    return result;
  }
}

export default OperationTraitsVisitor;
