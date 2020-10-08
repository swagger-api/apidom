import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';

import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
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
