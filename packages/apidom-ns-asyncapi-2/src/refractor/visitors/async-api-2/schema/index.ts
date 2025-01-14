import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';

import SchemaElement from '../../../../elements/Schema.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface SchemaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public element: SchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: SchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Schema']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new SchemaElement();

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = super.enter(booleanElement);
    this.element.classes.push('boolean-json-schema');

    return result;
  }
}

export default SchemaVisitor;
