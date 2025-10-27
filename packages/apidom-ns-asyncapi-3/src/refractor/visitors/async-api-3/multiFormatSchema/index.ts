import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';

import MultiFormatSchemaElement from '../../../../elements/MultiFormatSchema.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface MultiFormatSchemaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MultiFormatSchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public element: MultiFormatSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MultiFormatSchema']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MultiFormatSchemaVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'MultiFormatSchema']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    this.element = new MultiFormatSchemaElement();

    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }

  BooleanElement(booleanElement: BooleanElement) {
    const result = super.enter(booleanElement);
    this.element.classes.push('boolean-json-MultiFormatSchema');

    return result;
  }
}

export default MultiFormatSchemaVisitor;
