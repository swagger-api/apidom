import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecificationVisitor,
  SpecificationVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import JsonSchemaDialectElement from '../../../elements/JsonSchemaDialect.ts';

/**
 * @public
 */
export interface JsonSchemaDialectVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JsonSchemaDialectVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public element: JsonSchemaDialectElement;

  StringElement(stringElement: StringElement) {
    const jsonSchemaDialectElement = new JsonSchemaDialectElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, jsonSchemaDialectElement);

    this.element = jsonSchemaDialectElement;
    return BREAK;
  }
}

export default JsonSchemaDialectVisitor;
