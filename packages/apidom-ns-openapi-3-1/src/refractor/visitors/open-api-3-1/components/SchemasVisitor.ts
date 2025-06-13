import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { StringElement, ObjectElement, toValue } from '@swagger-api/apidom-core';
import {
  ComponentsSchemasElement,
  MapVisitor,
  MapVisitorOptions,
  FallbackVisitor,
  SpecPath,
  FallbackVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import SchemaElement from '../../../../elements/Schema.ts';
import { isSchemaElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface SchemasVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SchemasVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsSchemasElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  constructor(options: SchemasVisitorOptions) {
    super(options);
    this.element = new ComponentsSchemasElement();
    this.specPath = always(['document', 'objects', 'Schema']);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate Schemas elements with Schema name
    this.element
      .filter(isSchemaElement)
      // @ts-ignore
      .forEach((schemaElement: SchemaElement, schemaName: StringElement) => {
        schemaElement.setMetaProperty('schemaName', toValue(schemaName));
      });

    return result;
  }
}

export default SchemasVisitor;
