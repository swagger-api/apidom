import stampit from 'stampit';
import { isYamlMapping, YamlSequence } from 'apidom-ast';
// @ts-ignore
import { BREAK, SpecificationVisitor } from 'apidom-parser-adapter-yaml-1-2';

const SecurityVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    this.element.classes.push('security');
  },
  methods: {
    sequence(sequenceNode: YamlSequence) {
      sequenceNode.content.forEach((item) => {
        if (isYamlMapping(item)) {
          const element = this.nodeToElement(['document', 'objects', 'SecurityRequirement'], item);
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

export default SecurityVisitor;
