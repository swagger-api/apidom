import stampit from 'stampit';
import { test, always } from 'ramda';
import { Element, ObjectElement, StringElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponsesElement from '../../../../elements/Responses';
import MixedFieldsVisitor from '../../generics/MixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isResponseElement } from '../../../../predicates';

const ResponsesVisitor = stampit(MixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPathFixedFields: always(['document', 'objects', 'Responses']),
    specPathPatternedFields: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
    },
    fieldPatternPredicate: test(
      /^(100|101|1XX|200|201|202|203|204|205|2XX|301|302|303|305|306|307|3XX|400|402|403|404|405|406|408|409|410|411|413|414|415|417|426|4XX|500|501|502|503|504|505|5XX|)$/,
    ),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ResponsesElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'response');
      });

      // decorate every ResponseElement with metadata about their status code
      this.element.filter(isResponseElement).forEach((value: Element, key: StringElement) => {
        const httpStatusCode = key.clone();
        if (!this.fieldPatternPredicate(httpStatusCode.toValue())) return;
        value.setMetaProperty('http-status-code', httpStatusCode);
      });

      return result;
    },
  },
});

export default ResponsesVisitor;
