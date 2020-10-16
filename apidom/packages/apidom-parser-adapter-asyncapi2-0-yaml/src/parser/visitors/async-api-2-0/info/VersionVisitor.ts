import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';

import { appendMetadata } from '../../../metadata';
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
