import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceElement, isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import ComponentsExternalDocumentationElement from '../../../../elements/nces/ComponentsExternalDocumentation.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ExternalDocumentationVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ExternalDocumentationVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsExternalDocumentationElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ExternalDocumentation']
  >;

  constructor(options: ExternalDocumentationVisitorOptions) {
    super(options);
    this.element = new ComponentsExternalDocumentationElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ExternalDocumentation'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'externalDocumentation');
    });

    return result;
  }
}

export default ExternalDocumentationVisitor;
