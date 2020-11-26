import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { JsonObject } from 'apidom-ast';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import { isRequestBodyObject, isReferenceObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const RequestBodyVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isRequestBodyObject({}), specPath: ['document', 'objects', 'RequestBody'] },
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['value'] },
    ],
  },
  methods: {
    object(objectNode: JsonObject) {
      const result = AlternatingVisitor.compose.methods.object.call(this, objectNode);

      if (isReferenceElement(this.element)) {
        appendMetadata(['openapi-reference-for-requestBody'], this.element);
      }

      return result;
    },
  },
});

export default RequestBodyVisitor;
