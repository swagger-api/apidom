import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { isNonEmptyString, isUndefined } from 'ramda-adjunct';
import {
  ObjectElement,
  BooleanElement,
  ArrayElement,
  isStringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';
import {
  FixedFieldsVisitor,
  FixedFieldsVisitorOptions,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

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

  protected readonly default$schema = 'http://json-schema.org/draft-06/schema#';

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new JSONSchemaElement();
    this.handle$schema(objectElement);
    this.handle$id(objectElement);

    // for further processing consider this Schema Element as parent for all embedded Schema Elements
    this.parent = this.element;

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = this.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }

  handle$schema(objectElement: ObjectElement): void {
    // handle $schema keyword in embedded resources
    if (isUndefined(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // no parent available and no $schema is defined, set default $schema
      this.element.setMetaProperty('inherited$schema', this.default$schema);
    } else if (isJSONSchemaElement(this.parent) && !isStringElement(objectElement.get('$schema'))) {
      // parent is available and no $schema is defined, set parent $schema
      const inherited$schema = defaultTo(
        toValue(this.parent.meta.get('inherited$schema')),
        toValue(this.parent.$schema),
      );
      this.element.setMetaProperty('inherited$schema', inherited$schema);
    }
  }

  handle$id(objectElement: ObjectElement): void {
    // handle $id keyword in embedded resources
    // fetch parent's inherited$id
    const inherited$id =
      this.parent !== undefined
        ? cloneDeep(this.parent.getMetaProperty('inherited$id', []))
        : new ArrayElement();
    // get current $id keyword
    const $id = toValue(objectElement.get('$id'));

    // remember $id keyword if it's a non-empty strings
    if (isNonEmptyString($id)) {
      inherited$id.push($id);
    }

    this.element.setMetaProperty('inherited$id', inherited$id);
  }
}

export default JSONSchemaVisitor;
