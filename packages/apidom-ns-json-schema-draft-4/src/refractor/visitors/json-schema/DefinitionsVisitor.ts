import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

export interface DefinitionsVisitorOptions
  extends MapVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

class DefinitionsVisitor extends Mixin(MapVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
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
