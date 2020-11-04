import stampit from 'stampit';
import { YamlComment, YamlDocument, YamlMapping, YamlScalar, YamlSequence } from 'apidom-ast';

import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  props: {
    keyMap: {
      // @ts-ignore
      [YamlDocument.type]: ['children'],
    },
  },
  methods: {
    scalar(scalarNode: YamlScalar) {
      const element = this.nodeToElement(['scalar'], scalarNode);
      this.element.content.push(element);
    },

    mapping(mappingNode: YamlMapping) {
      const element = this.nodeToElement(['mapping'], mappingNode);
      this.element.content.push(element);
    },

    sequence(sequenceNode: YamlSequence) {
      const arrayElement = this.nodeToElement(['sequence'], sequenceNode);
      this.element.content.push(arrayElement);
    },

    comment(commentNode: YamlComment) {
      const commentElement = new this.namespace.elements.Comment(commentNode.content);
      this.element.content.push(commentElement);
    },
  },
});

export default DocumentVisitor;
