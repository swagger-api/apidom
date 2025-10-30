import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceElement, isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import ComponentOperationsElement from '../../../../elements/nces/ComponentOperations.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface OperationsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class OperationsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentOperationsElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Operation']
  >;

  constructor(options: OperationsVisitorOptions) {
    super(options);
    this.element = new ComponentOperationsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Operation'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'operation');
    });

    return result;
  }
}

export default OperationsVisitor;
