import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';

import { BREAK } from '..';
import { KindVisitor } from '../generics';
import SpecificationVisitor from '../SpecificationVisitor';

const AsyncapiVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      const asyncapiElement = new this.namespace.elements.Asyncapi(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, asyncapiElement);
      return BREAK;
    },
  },
});

export default AsyncapiVisitor;
