import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';
import { ObjectElement, Element, MemberElement } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import { isAsyncApiExtension } from '../../predicates';
import { BREAK } from '../../../traversal/visitor';
import { appendMetadata } from '../../metadata';

const PatternedFieldsJsonObjectVisitor = stampit(SpecificationVisitor, {
  props: {
    fieldPatternPredicate: stubFalse,
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: false,
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
    Object(objectElement: ObjectElement) {
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
          !this.ignoredFields.includes(key.toValue()) &&
          this.fieldPatternPredicate(key.toValue())
        ) {
          const specPath = this.specPath(value);
          const patternedFieldElement = this.toRefractedElement(specPath, value);
          const newMemberElement = new MemberElement(key.clone(), patternedFieldElement);
          this.copyMetaAndAttributes(memberElement, newMemberElement);
          appendMetadata(['patterned-field'], memberElement);
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
