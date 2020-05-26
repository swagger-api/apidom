'use strict';

const stampit = require('stampit');
const { visit, BREAK } = require('../visitor');
const SpecificationVisitor = require('./SpecificationVisitor');

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    document(documentNode) {
      const openApiVisitor = this.retrieveVisitorInstance(['document', 'openApi']);
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      visit(documentNode.child, openApiVisitor);
      visit(documentNode.comments, commentVisitor);

      this.element.content.push(openApiVisitor.element);
      this.element.meta.set('comments', commentVisitor.element);

      return BREAK;
    },
  },
});

module.exports = DocumentVisitor;
