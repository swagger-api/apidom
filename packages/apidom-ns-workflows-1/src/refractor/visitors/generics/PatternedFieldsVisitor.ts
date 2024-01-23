import { F as stubFalse } from 'ramda';
import {
  ObjectElement,
  Element,
  MemberElement,
  BREAK,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';
import { isWorkflowsSpecificationExtension } from '../../predicates';

class PatternedFieldsJsonObjectVisitor extends SpecificationVisitor {
  public fieldPatternPredicate: (...args: any[]) => boolean = stubFalse;

  public specPath!: (element: Element) => string[];

  public ignoredFields: string[] = [];

  public canSupportSpecificationExtensions: boolean = false;

  public specificationExtensionPredicate: (element: MemberElement) => boolean =
    isWorkflowsSpecificationExtension;

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

export default PatternedFieldsJsonObjectVisitor;
