import stampit from 'stampit';
import { YamlSequence } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { isServerObject } from '../../predicates';
import { KindVisitor } from '../generics';

const ServersVisitor = stampit(KindVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('servers');
  },
  methods: {
    sequence(sequenceNode: YamlSequence) {
      sequenceNode.content.forEach((item) => {
        if (isServerObject({}, item)) {
          const element = this.nodeToElement(['document', 'objects', 'Server'], item);
          this.element.push(element);
        } else {
          const element = this.nodeToElement(['kind'], item);
          this.element.push(element);
        }
      });

      this.maybeAddSourceMap(sequenceNode, this.element);

      return BREAK;
    },
  },
});

export default ServersVisitor;
