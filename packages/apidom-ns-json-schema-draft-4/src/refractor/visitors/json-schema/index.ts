import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { isNonEmptyString, isUndefined } from 'ramda-adjunct';
import {
  ObjectElement,
  ArrayElement,
  isStringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import JSONSchemaElement from '../../../elements/JSONSchema.ts';
import { isJSONSchemaElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface JSONSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JSONSchemaVisitor extends Mixin(
  FixedFieldsVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
) {
  declare public element: JSONSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }

  // eslint-disable-next-line class-methods-use-this
  get default$schema(): string {
    return 'http://json-schema.org/draft-04/schema#';
  }

  ObjectElement(objectElement: ObjectElement) {
    this.handleDialectIdentifier(objectElement);
    this.handleSchemaIdentifier(objectElement);

    // for further processing consider this Schema Element as parent for all embedded Schema Elements
    this.parent = this.element;

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  handleDialectIdentifier(objectElement: ObjectElement): void {
    // handle $schema keyword in embedded resources
    if (isUndefined(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // no parent available and no $schema is defined, set default $schema
      this.element.setMetaProperty('inheritedDialectIdentifier', this.default$schema);
    } else if (isJSONSchemaElement(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // parent is available and no $schema is defined, set parent $schema
      const inheritedDialectIdentifier = defaultTo(
        toValue(this.parent.meta.get('inheritedDialectIdentifier')),
        toValue(this.parent.$schema),
      );
      this.element.setMetaProperty('inheritedDialectIdentifier', inheritedDialectIdentifier);
    }
  }

  handleSchemaIdentifier(objectElement: ObjectElement): void {
    // handle id keyword in embedded resources
    // fetch parent's ancestorsSchemaIdentifiers
    const ancestorsSchemaIdentifiers =
      this.parent !== undefined
        ? cloneDeep(this.parent.getMetaProperty('ancestorsSchemaIdentifiers', []))
        : new ArrayElement();
    // get current id keyword
    const id = toValue(objectElement.get('id'));

    // remember id keyword if it's a non-empty strings
    if (isNonEmptyString(id)) {
      ancestorsSchemaIdentifiers.push(id);
    }

    this.element.setMetaProperty('ancestorsSchemaIdentifiers', ancestorsSchemaIdentifiers);
  }
}

export default JSONSchemaVisitor;
