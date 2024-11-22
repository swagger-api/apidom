import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isJSONReferenceLikeElement,
  isJSONReferenceElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import DefinitionsElement from '../../../../elements/Definitions.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface DefinitionsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class DefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: DefinitionsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'JSONReference'] | ['document', 'objects', 'Schema']
  >;

  constructor(options: DefinitionsVisitorOptions) {
    super(options);
    this.element = new DefinitionsElement();
    this.specPath = (element: unknown) => {
      return isJSONReferenceLikeElement(element)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'Schema'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every JSONReferenceElement with metadata about their referencing type
    this.element
      .filter(isJSONReferenceElement)
      // @ts-ignore
      .forEach((referenceElement: JSONReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

    return result;
  }
}

export default DefinitionsVisitor;
