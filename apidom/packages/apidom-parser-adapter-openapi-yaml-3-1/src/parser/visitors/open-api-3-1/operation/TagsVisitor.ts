import stampit from 'stampit';
import { YamlSequence } from 'apidom-ast';
// @ts-ignore
import { SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';

const TagsVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    sequence(sequenceNode: YamlSequence) {
      // @ts-ignore
      const result = KindVisitor.compose.methods.sequence.call(this, sequenceNode);

      this.element.classes.push('tags');

      return result;
    },
  },
});

export default TagsVisitor;
