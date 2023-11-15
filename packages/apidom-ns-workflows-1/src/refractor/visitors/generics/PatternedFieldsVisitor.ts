import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';
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

const PatternedFieldsJsonObjectVisitor = stampit(SpecificationVisitor, {
  props: {
    fieldPatternPredicate: stubFalse,
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: false,
    specificationExtensionPredicate: isWorkflowsSpecificationExtension,
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
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      objectElement.forEach((value: Element, key: Element, memberElement: MemberElement) => {
        if (
          this.canSupportSpecificationExtensions &&
          this.specificationExtensionPredicate(memberElement)
        ) {
          const extensionElement = this.toRefractedElement(
            ['document', 'extension'],
            memberElement,
          );
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
    },
  },
});

export default PatternedFieldsJsonObjectVisitor;
