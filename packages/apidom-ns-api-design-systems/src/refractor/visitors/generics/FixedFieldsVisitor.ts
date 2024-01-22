import {
  BREAK,
  isStringElement,
  MemberElement,
  ObjectElement,
  Element,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';

class FixedFieldsVisitor extends SpecificationVisitor {
  public specPath!: (element: Element) => string[];

  public ignoredFields: string[] = [];

  public ObjectElement(objectElement: ObjectElement) {
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
