import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import { BREAK, isStringElement, MemberElement, Element } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import { isAsyncApiExtension } from '../../predicates';

const FixedFieldsVisitor = stampit(SpecificationVisitor, {
  props: {
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: true,
    specificationExtensionPredicate: isAsyncApiExtension,
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
          fields.includes(key.toValue()) &&
          !this.ignoredFields.includes(key.toValue())
        ) {
          const fixedFieldElement = this.toRefractedElement(
            [...specPath, 'fixedFields', key.toValue()],
            value,
          );
          const newMemberElement = new MemberElement(key.clone(), fixedFieldElement);
          newMemberElement.classes.push('fixed-field');
          this.copyMetaAndAttributes(memberElement, newMemberElement);
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
        } else if (!this.ignoredFields.includes(key.toValue())) {
          this.element.content.push(memberElement.clone());
        }
      });

      this.copyMetaAndAttributes(objectElement, this.element);

      return BREAK;
    },
  },
});

export default FixedFieldsVisitor;
