import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { YamlMapping } from 'apidom-ast';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

import { isRequestBodyObject, isReferenceObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const RequestBodyVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isRequestBodyObject({}), specPath: ['document', 'objects', 'RequestBody'] },
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['kind'] },
    ],
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const result = AlternatingVisitor.compose.methods.mapping.call(this, mappingNode);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'requestBody');
      }

      return result;
    },
  },
});

export default RequestBodyVisitor;
