import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor.ts';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';
import { isJSONReferenceLikeElement } from '../../predicates.ts';

/**
 * @public
 */
export interface DefinitionsVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
export const DefinitionsVisitorBase = Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor);

/**
 * @public
 */
class DefinitionsVisitor extends DefinitionsVisitorBase {
  public declare readonly element: ObjectElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'JSONReference'] | ['document', 'objects', 'JSONSchema']
  >;

  constructor(options: DefinitionsVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('json-schema-definitions');
    this.specPath = (element: unknown) =>
      isJSONReferenceLikeElement(element)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'];
  }
}

export default DefinitionsVisitor;
