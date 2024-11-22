import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsParametersElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Parameter']
  >;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ComponentsParametersElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Parameter'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'parameter');
    });

    return result;
  }
}

export default ParametersVisitor;
