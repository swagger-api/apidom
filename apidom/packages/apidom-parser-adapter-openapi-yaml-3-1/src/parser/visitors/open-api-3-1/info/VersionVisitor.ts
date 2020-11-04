import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';

const VersionVisitor = stampit(KindVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      // @ts-ignore
      const result = KindVisitor.compose.methods.scalar.call(this, scalarNode);

      appendMetadata(['version'], this.element);

      return result;
    },
  },
});

export default VersionVisitor;
