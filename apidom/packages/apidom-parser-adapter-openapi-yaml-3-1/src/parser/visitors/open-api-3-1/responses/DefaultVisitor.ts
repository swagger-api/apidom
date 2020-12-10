import stampit from 'stampit';
import { T as stubTrue } from 'ramda';
import { YamlMapping } from 'apidom-ast';
import { isReferenceElement } from 'apidom-ns-openapi-3-1';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import AlternatingVisitor from '../../generics/AlternatingVisitor';

const DefaultVisitor = stampit(AlternatingVisitor, {
  props: {
    alternator: [
      { predicate: isReferenceObject({}), specPath: ['document', 'objects', 'Reference'] },
      { predicate: isResponseObject({}), specPath: ['document', 'objects', 'Response'] },
      { predicate: stubTrue, specPath: ['kind'] },
    ],
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const result = AlternatingVisitor.compose.methods.object.call(this, mappingNode);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'response');
      }

      return result;
    },
  },
});

export default DefaultVisitor;
