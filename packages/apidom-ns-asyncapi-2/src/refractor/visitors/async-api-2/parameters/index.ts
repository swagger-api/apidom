import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ParametersElement from '../../../../elements/Parameters.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';
import ReferenceElement from '../../../../elements/Reference.ts';

/**
 * @public
 */
export interface ParametersVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ParametersElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Parameter'] | ['value']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

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
