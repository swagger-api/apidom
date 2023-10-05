import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import {
  isStringElement,
  MemberElement,
  Element,
  BREAK,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';
import { isSwaggerExtension } from '../../predicates';

const FixedFieldsVisitor = stampit(SpecificationVisitor, {
  props: {
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: true,
    specificationExtensionPredicate: isSwaggerExtension,
  },
  init({
    // @ts-ignore
    specPath = this.specPath,
    // @ts-ignore
    ignoredFields = this.ignoredFields,
    // @ts-ignore
    canSupportSpecificationExtensions = this.canSupportSpecificationExtensions,
    // @ts-ignore
    specificationExtensionPredicate = this.specificationExtensionPredicate,
  } = {}) {
    this.specPath = specPath;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    this.specificationExtensionPredicate = specificationExtensionPredicate;
  },
  methods: {
    ObjectElement(objectElement) {
      const specPath = this.specPath(objectElement);
      const fields = this.retrieveFixedFields(specPath);

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
          this.copyMetaAndAttributes(memberElement, newMemberElement);
          newMemberElement.classes.push('fixed-field');
          this.element.content.push(newMemberElement);
        } else if (
          this.canSupportSpecificationExtensions &&
          this.specificationExtensionPredicate(memberElement)
        ) {
          const extensionElement = this.toRefractedElement(
            ['document', 'extension'],
            memberElement,
          );
          this.element.content.push(extensionElement);
        } else if (!this.ignoredFields.includes(toValue(key))) {
          this.element.content.push(cloneDeep(memberElement));
        }
      });

      this.copyMetaAndAttributes(objectElement, this.element);

      return BREAK;
    },
  },
});

export default FixedFieldsVisitor;
