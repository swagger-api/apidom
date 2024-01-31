import { Mixin } from 'ts-mixer';
import { always, range } from 'ramda';
import {
  Element,
  ObjectElement,
  StringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponsesElement from '../../../../elements/Responses';
import MixedFieldsVisitor, {
  MixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/MixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isResponseElement } from '../../../../predicates';

class ResponsesVisitor extends Mixin(MixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ResponsesElement;

  public declare readonly specPathFixedFields: SpecPath<['document', 'objects', 'Responses']>;

  public declare readonly canSupportSpecificationExtensions: true;

  public declare readonly specPathPatternedFields: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Response']
  >;

  constructor(options: MixedFieldsVisitorOptions) {
    super(options);
    this.element = new ResponsesElement();
    this.specPathFixedFields = always(['document', 'objects', 'Responses']);
    this.canSupportSpecificationExtensions = true;
    this.specPathPatternedFields = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
    this.fieldPatternPredicate = (value) =>
      typeof value === 'string' &&
      new RegExp(`^(1XX|2XX|3XX|4XX|5XX|${range(100, 600).join('|')})$`).test(value);
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
