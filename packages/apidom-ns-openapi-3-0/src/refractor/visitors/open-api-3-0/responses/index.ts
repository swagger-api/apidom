import { Mixin } from 'ts-mixer';
import { always, range } from 'ramda';
import {
  Element,
  ObjectElement,
  StringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ResponsesElement from '../../../../elements/Responses.ts';
import MixedFieldsVisitor, {
  MixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/MixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement, isResponseElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ResponsesVisitorOptions
  extends MixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ResponsesVisitor extends Mixin(MixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ResponsesElement;

  declare protected readonly specPathFixedFields: SpecPath<['document', 'objects', 'Responses']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  declare protected readonly specPathPatternedFields: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Response']
  >;

  constructor(options: ResponsesVisitorOptions) {
    super(options);
    this.element = new ResponsesElement();
    this.specPathFixedFields = always(['document', 'objects', 'Responses']);
    this.canSupportSpecificationExtensions = true;
    this.specPathPatternedFields = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
    this.fieldPatternPredicate = (value) =>
      new RegExp(`^(1XX|2XX|3XX|4XX|5XX|default|${range(100, 600).join('|')})$`).test(
        String(value),
      );
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'response');
    });

    // decorate every ResponseElement with metadata about their status code
    // @ts-ignore
    this.element.filter(isResponseElement).forEach((value: Element, key: StringElement) => {
      const httpStatusCode = cloneDeep(key);
      if (!this.fieldPatternPredicate(toValue(httpStatusCode))) return;
      value.setMetaProperty('http-status-code', httpStatusCode);
    });

    return result;
  }
}

export default ResponsesVisitor;
