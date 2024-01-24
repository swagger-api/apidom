import {
  BREAK,
  isStringElement,
  MemberElement,
  ObjectElement,
  Element,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';

export type SpecPath<T = string[]> = (element: unknown) => T;

export interface FixedFieldsVisitorOptions extends SpecificationVisitorOptions {
  readonly specPath: SpecPath;
  readonly ignoredFields?: string[];
}

class FixedFieldsVisitor extends SpecificationVisitor {
  protected specPath: SpecPath;

  protected ignoredFields: string[];

  constructor({ specPath, ignoredFields, ...rest }: FixedFieldsVisitorOptions) {
    super({ ...rest });
    this.specPath = specPath;
    this.ignoredFields = ignoredFields || [];
  }

  ObjectElement(objectElement: ObjectElement) {
    const specPath = this.specPath(objectElement);
    const fields = this.retrieveFixedFields(specPath);

    // @ts-ignore
    objectElement.forEach((value: Element, key: Element, memberElement: MemberElement) => {
      if (
        isStringElement(key) &&
        fields.includes(toValue(key)) &&
        !this.ignoredFields.includes(toValue(key))
      ) {
        const fixedFieldElement = this.toRefractedElement(
          [...specPath, 'fixedFields', toValue(key)],
          value,
        );
        const newMemberElement = new MemberElement(cloneDeep(key), fixedFieldElement);
        newMemberElement.classes.push('fixed-field');
        this.copyMetaAndAttributes(memberElement, newMemberElement);
        this.element.content.push(newMemberElement);
      } else if (!this.ignoredFields.includes(toValue(key))) {
        this.element.content.push(cloneDeep(memberElement));
      }
    });

    this.copyMetaAndAttributes(objectElement, this.element);

    return BREAK;
  }
}

export default FixedFieldsVisitor;
