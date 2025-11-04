import { Mixin } from 'ts-mixer';
import { always, defaultTo } from 'ramda';
import { ObjectElement, toValue, isObjectElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import mediaTypes from '../../../../media-types.ts';
import MultiFormatSchemaElement from '../../../../elements/MultiFormatSchema.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * Implementation of refracting according `schemaFormat` fixed field is now limited,
 * and currently only supports `AsyncAPI Schema Object 3.0.0`
 * @public
 */
export interface MultiFormatSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MultiFormatSchemaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public element: MultiFormatSchemaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MultiFormatSchema']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MultiFormatSchemaVisitorOptions) {
    super(options);
    this.element = new MultiFormatSchemaElement();
    this.specPath = always(['document', 'objects', 'MultiFormatSchema']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
    const schema = this.element.get('schema');
    const schemaFormat = defaultTo(mediaTypes.latest(), toValue(objectElement.get('schemaFormat')));

    if (mediaTypes.includes(schemaFormat) && isReferenceLikeElement(schema)) {
      // refract to ReferenceElement
      const referenceElement = this.toRefractedElement(
        ['document', 'objects', 'Reference'],
        schema,
      );
      referenceElement.meta.set('referenced-element', 'schema');
      this.element.schema = referenceElement;
    } else if (mediaTypes.includes(schemaFormat) && isObjectElement(this.element.schema)) {
      this.element.schema = this.toRefractedElement(
        ['document', 'objects', 'Schema'],
        this.element.schema,
      );
    }

    return result;
  }
}

export default MultiFormatSchemaVisitor;
