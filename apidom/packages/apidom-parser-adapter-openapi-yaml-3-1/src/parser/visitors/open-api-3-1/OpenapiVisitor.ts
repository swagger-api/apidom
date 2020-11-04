import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../generics';

const OpenapiVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      const openapiElement = new this.namespace.elements.Openapi(scalarNode.content);
      this.element = this.maybeAddSourceMap(scalarNode, openapiElement);
      return BREAK;
    },
  },
});

export default OpenapiVisitor;
