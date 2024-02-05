import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsParametersElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Parameter']
  >;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ComponentsParametersElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Parameter'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'parameter');
    });

    return result;
  }
}

export default ParametersVisitor;
