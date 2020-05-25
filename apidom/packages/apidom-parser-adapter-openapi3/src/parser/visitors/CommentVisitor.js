'use strict';

const stampit = require('stampit');
const SpecificationVisitor = require('./SpecificationVisitor');

const CommentVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
  },
  methods: {
    comment(commentNode) {
      const commentElement = this.maybeAddSourceMap(
        commentNode,
        new this.namespace.elements.Comment(commentNode.value)
      );

      this.element.push(commentElement);
    },
  },
});



module.exports = CommentVisitor;
