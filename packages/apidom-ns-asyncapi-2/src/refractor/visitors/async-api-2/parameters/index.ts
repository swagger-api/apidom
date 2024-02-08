import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import ParametersElement from '../../../../elements/Parameters';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';

export interface ParametersVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ParametersVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ParametersElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Parameter'] | ['value']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ParametersElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Parameter'];
    this.canSupportSpecificationExtensions = false;
    this.fieldPatternPredicate = (value: unknown) =>
      typeof value === 'string' && /^[A-Za-z0-9_-]+$/.test(value);
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
