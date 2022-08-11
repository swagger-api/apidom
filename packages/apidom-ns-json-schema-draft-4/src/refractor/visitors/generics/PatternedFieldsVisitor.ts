import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';
import { ObjectElement, Element, MemberElement, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../SpecificationVisitor';

const PatternedFieldsJsonObjectVisitor = stampit(SpecificationVisitor, {
  props: {
    fieldPatternPredicate: stubFalse,
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
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      objectElement.forEach((value: Element, key: Element, memberElement: MemberElement) => {
        if (
          !this.ignoredFields.includes(key.toValue()) &&
          this.fieldPatternPredicate(key.toValue())
        ) {
          const specPath = this.specPath(value);
          const patternedFieldElement = this.toRefractedElement(specPath, value);
          const newMemberElement = new MemberElement(key.clone(), patternedFieldElement);
          this.copyMetaAndAttributes(memberElement, newMemberElement);
          newMemberElement.classes.push('patterned-field');
          this.element.content.push(newMemberElement);
        } else if (!this.ignoredFields.includes(key.toValue())) {
          this.element.content.push(memberElement.clone());
        }
      });

      this.copyMetaAndAttributes(objectElement, this.element);

      return BREAK;
    },
  },
});

export default PatternedFieldsJsonObjectVisitor;
