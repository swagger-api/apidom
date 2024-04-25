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
import { SpecPath } from './FixedFieldsVisitor';

export type { SpecPath };

export interface PatternedFieldsVisitorOptions extends SpecificationVisitorOptions {
  readonly specPath: SpecPath;
  readonly ignoredFields?: string[];
  readonly fieldPatternPredicate?: (...args: unknown[]) => boolean;
}

class PatternedFieldsVisitor extends SpecificationVisitor {
  protected specPath: SpecPath;

  protected ignoredFields: string[];

  protected fieldPatternPredicate: (value: unknown) => boolean = stubFalse;

  constructor({
    specPath,
    ignoredFields,
    fieldPatternPredicate,
    ...rest
  }: PatternedFieldsVisitorOptions) {
    super({ ...rest });
    this.specPath = specPath;
    this.ignoredFields = ignoredFields || [];

    if (typeof fieldPatternPredicate === 'function') {
      this.fieldPatternPredicate = fieldPatternPredicate;
    }
  }

  ObjectElement(objectElement: ObjectElement) {
    // @ts-ignore
    objectElement.forEach((value: Element, key: Element, memberElement: MemberElement) => {
      if (!this.ignoredFields.includes(toValue(key)) && this.fieldPatternPredicate(toValue(key))) {
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
