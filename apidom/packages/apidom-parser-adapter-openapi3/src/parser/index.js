'use strict';

const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');
const jsonAst = require('json-ast');
const DocumentVisitor = require('./visitors/document');
const { visit } = require('./visitor');

const parse = (source, { sourceMap = false } = {}) => {
  const namespace = apiDOM.createNamespace(openapi3);
  const ast = jsonAst.parse(source, { verbose: true, junker: true });
  const documentVisitor = DocumentVisitor();

  visit(ast, documentVisitor, { state: { namespace, sourceMap }});

  return documentVisitor.element;
};

module.exports = parse;
