import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ExampleElement from '../../../../elements/Example.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ExampleVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ExampleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ExampleElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Example']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ExampleVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
    this.specPath = always(['document', 'objects', 'Example']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this ExampleElement with reference metadata
    if (isStringElement(this.element.externalValue)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default ExampleVisitor;
