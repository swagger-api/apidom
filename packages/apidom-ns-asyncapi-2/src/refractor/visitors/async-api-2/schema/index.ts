import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, BooleanElement } from '@swagger-api/apidom-core';

import SchemaElement from '../../../../elements/Schema';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class SchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare element: SchemaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Schema']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
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
