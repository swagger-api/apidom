import stampit from 'stampit';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import { ValueVisitor } from '../../generics';

const VersionVisitor = stampit(ValueVisitor, {
  methods: {
    string(stringNode) {
      // @ts-ignore
      const result = ValueVisitor.compose.methods.string.call(this, stringNode);

      appendMetadata(['version'], this.element);

      return result;
    },
  },
});

export default VersionVisitor;
