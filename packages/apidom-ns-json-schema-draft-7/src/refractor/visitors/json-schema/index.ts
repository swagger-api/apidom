import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isNonEmptyString } from 'ramda-adjunct';
import {
  ObjectElement,
  BooleanElement,
  ArrayElement,
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
} from '@swagger-api/apidom-ns-json-schema-draft-6';

import JSONSchemaElement from '../../../elements/JSONSchema.ts';

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

  protected readonly default$schema = 'http://json-schema.org/draft-07/schema#';

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new JSONSchemaElement();
    this.handle$schema();
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

  handle$schema(): void {
    // handle $schema keyword in embedded resources
    this.element.setMetaProperty('inherited$schema', this.default$schema);
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
