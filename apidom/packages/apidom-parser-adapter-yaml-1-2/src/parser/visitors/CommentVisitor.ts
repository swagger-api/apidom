import stampit from 'stampit';
import { YamlComment } from 'apidom-ast';

import { BREAK } from './index';
import SpecificationVisitor from './SpecificationVisitor';

const CommentVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Comment();
  },
  methods: {
    comment(commentNode: YamlComment) {
      this.element.content = commentNode.content;
      this.maybeAddSourceMap(commentNode, this.element);

      return BREAK;
    },
  },
});

export default CommentVisitor;
