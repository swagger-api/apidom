import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isReferenceLikeElement } from '../../predicates';
import { isReferenceElement } from '../../../predicates';
import ReferenceElement from '../../../elements/Reference';

export type { MapVisitorOptions as ExamplesVisitorOptions };

class ExamplesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ObjectElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Example']
  >;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('examples');
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Example'];
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'example');
    });

    return result;
  }
}

export default ExamplesVisitor;
