import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../predicates.ts';
import { isReferenceElement } from '../../../predicates.ts';
import ReferenceElement from '../../../elements/Reference.ts';

/**
 * @public
 */
export interface ExamplesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ExamplesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Example']
  >;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ExamplesVisitorOptions) {
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
