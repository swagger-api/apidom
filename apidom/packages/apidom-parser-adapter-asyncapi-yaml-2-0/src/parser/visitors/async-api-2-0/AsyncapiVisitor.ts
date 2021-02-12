import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../generics';

const AsyncapiVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      const asyncapiElement = new this.namespace.elements.AsyncApiVersion(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, asyncapiElement);
      return BREAK;
    },
  },
});

export default AsyncapiVisitor;
