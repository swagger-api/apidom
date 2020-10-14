import stampit from 'stampit';
import { test, always } from 'ramda';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import MixedFieldsYamlMappingVisitor from '../../generics/MixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ResponsesVisitor = stampit(KindVisitor, MixedFieldsYamlMappingVisitor, {
  props: {
    specPathFixedFields: always(['document', 'objects', 'Responses']),
    specPathPatternedFields: (node: unknown) => {
      /* eslint-disable no-nested-ternary */
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isResponseObject({}, node)
        ? ['document', 'objects', 'Response']
        : ['kind'];
      /* eslint-enable */
    },
    fieldPatternPredicate: test(/^\d{3}$/),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.Responses();
  },
});

export default ResponsesVisitor;
