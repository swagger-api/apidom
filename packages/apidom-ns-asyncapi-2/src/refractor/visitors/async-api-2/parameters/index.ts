import { Mixin } from 'ts-mixer';
import { test } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ParametersElement from '../../../../elements/Parameters';
import { isReferenceLikeElement, isParameterLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';

class ParametersVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ParametersElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Parameter'] | ['value']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: PatternedFieldsVisitorOptions) {
    super(options);
    this.element = new ParametersElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isParameterLikeElement(element)
          ? ['document', 'objects', 'Parameter']
          : ['value'];
    };
    this.canSupportSpecificationExtensions = false;
    // @ts-ignore
    this.fieldPatternPredicate = test(/^[A-Za-z0-9_-]+$/);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = PatternedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'parameter');
    });

    return result;
  }
}

export default ParametersVisitor;
