import stampit from 'stampit';
import { YamlSequence } from 'apidom-ast';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';

const TagsVisitor = stampit(KindVisitor, {
  methods: {
    sequence(sequenceNode: YamlSequence) {
      // @ts-ignore
      const result = KindVisitor.compose.methods.sequence.call(this, sequenceNode);

      appendMetadata(['tags'], this.element);

      return result;
    },
  },
});

export default TagsVisitor;
