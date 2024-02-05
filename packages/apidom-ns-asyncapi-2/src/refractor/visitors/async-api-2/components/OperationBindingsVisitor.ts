import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsOperationBindingsElement from '../../../../elements/nces/ComponentsOperationBindings';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface OperationBindingsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

class OperationBindingsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsOperationBindingsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'OperationBindings']
  >;

  constructor(options: OperationBindingsVisitorOptions) {
    super(options);
    this.element = new ComponentsOperationBindingsElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'OperationBindings'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'operationBindings');
    });

    return result;
  }
}

export default OperationBindingsVisitor;
