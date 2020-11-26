import stampit from 'stampit';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../../generics';

const TagsVisitor = stampit(ValueVisitor, {
  methods: {
    array(arrayNode) {
      // @ts-ignore
      const result = ValueVisitor.compose.methods.array.call(this, arrayNode);

      appendMetadata(['tags'], this.element);

      return result;
    },
  },
});

export default TagsVisitor;
