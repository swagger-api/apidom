import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsOperationBindingsElement from '../../../../elements/nces/ComponentsOperationBindings.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface OperationBindingsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OperationBindingsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsOperationBindingsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'OperationBindings']
  >;

  constructor(options: OperationBindingsVisitorOptions) {
    super(options);
    this.element = new ComponentsOperationBindingsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'OperationBindings'];
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
