import {
  BREAK,
  isStringElement,
  MemberElement,
  Element,
  cloneDeep,
  toValue,
  ObjectElement,
} from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import { isAsyncApiExtension } from '../../predicates.ts';

/**
 * @public
 */
export type SpecPath<T = string[]> = (element: unknown) => T;

/**
 * @public
 */
export interface FixedFieldsVisitorOptions extends SpecificationVisitorOptions {
  readonly specPath: SpecPath;
  readonly ignoredFields?: string[];
  readonly canSupportSpecificationExtensions?: boolean;
  readonly specificationExtensionPredicate?: typeof isAsyncApiExtension;
}

/**
 * @public
 */
class FixedFieldsVisitor extends SpecificationVisitor {
  protected specPath: SpecPath;

  protected ignoredFields: string[];

  protected canSupportSpecificationExtensions: boolean = true;

  protected specificationExtensionPredicate = isAsyncApiExtension;

  constructor({
    specPath,
    ignoredFields,
    canSupportSpecificationExtensions,
    specificationExtensionPredicate,
    ...rest
  }: FixedFieldsVisitorOptions) {
    super({ ...rest });
    this.specPath = specPath;
    this.ignoredFields = ignoredFields || [];

    if (typeof canSupportSpecificationExtensions === 'boolean') {
      this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    }

    if (typeof specificationExtensionPredicate === 'function') {
      this.specificationExtensionPredicate = specificationExtensionPredicate;
    }
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
      } else if (
        this.canSupportSpecificationExtensions &&
        this.specificationExtensionPredicate(memberElement)
      ) {
        const extensionElement = this.toRefractedElement(['document', 'extension'], memberElement);
        this.element.content.push(extensionElement);
      } else if (!this.ignoredFields.includes(toValue(key))) {
        this.element.content.push(cloneDeep(memberElement));
      }
    });

    this.copyMetaAndAttributes(objectElement, this.element);

    return BREAK;
  }
}

export default FixedFieldsVisitor;
