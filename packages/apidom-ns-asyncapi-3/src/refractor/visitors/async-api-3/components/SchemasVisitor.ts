import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsSchemasElement from '../../../../elements/nces/ComponentsSchemas.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isMultiFormatSchemaElement, isReferenceElement } from '../../../../predicates.ts';
import { isMultiFormatSchemaLikeElement } from '../../../predicates.ts';
import MultiFormatSchema from '../../../../elements/MultiFormatSchema.ts';

/**
 * @public
 */
export interface SchemasVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SchemasVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsSchemasElement;

  declare protected readonly specPath: SpecPath<
    | ['document', 'objects', 'Reference']
    | ['document', 'objects', 'Schema']
    | ['document', 'objects', 'MultiFormatSchema']
  >;

  constructor(options: SchemasVisitorOptions) {
    super(options);
    this.element = new ComponentsSchemasElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isMultiFormatSchemaLikeElement(element)
          ? ['document', 'objects', 'MultiFormatSchema']
          : ['document', 'objects', 'Schema'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    this.element
      .filter(isMultiFormatSchemaElement)
      // @ts-ignore
      .forEach((multiFormatSchemaElement: MultiFormatSchema) => {
        multiFormatSchemaElement.setMetaProperty('multiformat-schema-element', 'schema');
      });

    return result;
  }
}

export default SchemasVisitor;