import stampit from 'stampit';
import { YamlScalar } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { KindVisitor } from '../../generics';

const $RefVisitor = stampit(KindVisitor, SpecificationVisitor, {
  methods: {
    scalar(scalarNode: YamlScalar) {
      const { content } = scalarNode;
      const refElement = new this.namespace.elements.Ref(content);
      refElement.path = content;
      this.element = this.maybeAddSourceMap(scalarNode, refElement);

      return BREAK;
    },
  },
});

export default $RefVisitor;
