import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { JsonObject } from 'apidom-ast';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const DefaultVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
      { predicate: isResponseObject({}), specPath: ['document', 'objects', 'Response'] },
      { predicate: stubTrue, specPath: ['value'] },
    ],
  },
  methods: {
    object(objectNode: JsonObject) {
      const result = AlternatingVisitor.compose.methods.object.call(this, objectNode);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'response');
      }

      return result;
    },
  },
});

export default DefaultVisitor;
