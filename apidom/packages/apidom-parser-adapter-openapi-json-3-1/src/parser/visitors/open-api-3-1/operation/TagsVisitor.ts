import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../../generics';

const TagsVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      // @ts-ignore
      const result = ValueVisitor.compose.methods.array.call(this, arrayNode);

      this.element.classes.push('tags');

      return result;
    },
  },
});

export default TagsVisitor;
