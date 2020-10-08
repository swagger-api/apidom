import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';

import { KindVisitor } from '../../generics';
import { appendMetadata } from '../../../metadata';

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
