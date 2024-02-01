import { F as stubFalse } from 'ramda';
import {
  ObjectElement,
  Element,
  MemberElement,
  BREAK,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import type { SpecPath } from './FixedFieldsVisitor';
import { isOpenApiExtension } from '../../predicates';

export type { SpecPath };

export interface PatternedFieldsVisitorOptions extends SpecificationVisitorOptions {
  readonly specPath: SpecPath;
  readonly ignoredFields?: string[];
  readonly fieldPatternPredicate?: (...args: unknown[]) => boolean;
  readonly canSupportSpecificationExtensions?: boolean;
  readonly specificationExtensionPredicate?: typeof isOpenApiExtension;
}

class PatternedFieldsVisitor extends SpecificationVisitor {
  protected specPath: SpecPath;

  protected ignoredFields: string[];

  protected fieldPatternPredicate: (value: unknown) => boolean = stubFalse;

  protected canSupportSpecificationExtensions: boolean = false;

  protected specificationExtensionPredicate = isOpenApiExtension;

  constructor({
    specPath,
    ignoredFields,
    fieldPatternPredicate,
    canSupportSpecificationExtensions,
    specificationExtensionPredicate,
    ...rest
  }: PatternedFieldsVisitorOptions) {
    super({ ...rest });
    this.specPath = specPath;
    this.ignoredFields = ignoredFields || [];

    if (typeof fieldPatternPredicate === 'function') {
      this.fieldPatternPredicate = fieldPatternPredicate;
    }

    if (typeof canSupportSpecificationExtensions === 'boolean') {
      this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    }

    if (typeof specificationExtensionPredicate === 'function') {
      this.specificationExtensionPredicate = specificationExtensionPredicate;
    }
  }

  ObjectElement(objectElement: ObjectElement) {
    // @ts-ignore
    objectElement.forEach((value: Element, key: Element, memberElement: MemberElement) => {
      if (
        this.canSupportSpecificationExtensions &&
        this.specificationExtensionPredicate(memberElement)
      ) {
        const extensionElement = this.toRefractedElement(['document', 'extension'], memberElement);
        this.element.content.push(extensionElement);
      } else if (
        !this.ignoredFields.includes(toValue(key)) &&
        this.fieldPatternPredicate(toValue(key))
      ) {
        const specPath = this.specPath(value);
        const patternedFieldElement = this.toRefractedElement(specPath, value);
        const newMemberElement = new MemberElement(cloneDeep(key), patternedFieldElement);
        this.copyMetaAndAttributes(memberElement, newMemberElement);
        newMemberElement.classes.push('patterned-field');
        this.element.content.push(newMemberElement);
      } else if (!this.ignoredFields.includes(toValue(key))) {
        this.element.content.push(cloneDeep(memberElement));
      }
    });

    this.copyMetaAndAttributes(objectElement, this.element);

    return BREAK;
  }
}

export default PatternedFieldsVisitor;
