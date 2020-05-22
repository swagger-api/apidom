'use strict';

const stampit = require('stampit');
const { pick } = require('ramda');
const { visit, BREAK } = require('../visitor');
const SpecificationVisitor = require('./SpecificationVisitor');

const DocumentVisitor = stampit(SpecificationVisitor, {
  methods: {
    document(documentNode) {
      this.element = new this.namespace.elements.ParseResult();
      const openApiVisitor = this.retrieveVisitorInstance(['document', 'openApi']);

      visit(documentNode.child, openApiVisitor);

      this.element.content.push(openApiVisitor.element);

      return BREAK;
    },
  },
});

module.exports = DocumentVisitor;
