import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import {
  BREAK,
  isStringElement,
  MemberElement,
  Element,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';

const FixedFieldsVisitor = stampit(SpecificationVisitor, {
  props: {
    specPath: noop,
    ignoredFields: [],
  },
  init({
    // @ts-ignore
    specPath = this.specPath,
    // @ts-ignore
    ignoredFields = this.ignoredFields,
  } = {}) {
    this.specPath = specPath;
    this.ignoredFields = ignoredFields;
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
          newMemberElement.classes.push('fixed-field');
          this.copyMetaAndAttributes(memberElement, newMemberElement);
          this.element.content.push(newMemberElement);
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
