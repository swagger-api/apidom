import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsPathItemsElement from '../../../../elements/nces/ComponentsPathItems';
import { isReferenceElement } from '../../../../predicates';

export interface PathItemsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class PathItemsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsPathItemsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'PathItem']
  >;

  constructor(options: PathItemsVisitorOptions) {
    super(options);
    this.element = new ComponentsPathItemsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'pathItem');
    });

    return result;
  }
}

export default PathItemsVisitor;
