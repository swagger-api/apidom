import stampit from 'stampit';
import { JsonString, isJsonString } from 'apidom-ast';

import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';

const TagsVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      const tagElements = arrayNode.items
        .filter(isJsonString)
        .map((stringNode: JsonString) => this.nodeToElement(['value'], stringNode));

      const tagsElement = new this.namespace.elements.Array(tagElements);
      tagsElement.classes.push('tags');

      this.element = this.maybeAddSourceMap(arrayNode, tagsElement);

      return BREAK;
    },
  },
});

export default TagsVisitor;
