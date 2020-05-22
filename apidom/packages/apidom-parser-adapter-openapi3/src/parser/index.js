'use strict';

const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');
const jsonAst = require('json-ast');
const { specification } = require('./specification');
const { visit } = require('./visitor');

const parse = (source, { sourceMap = false, specObj = specification } = {}) => {
  const namespace = apiDOM.createNamespace(openapi3);
  const ast = jsonAst.parse(source, { verbose: true, junker: true });
  const documentVisitor = specObj.visitors.document.$visitor();

  visit(ast, documentVisitor, { state: { namespace, specObj, sourceMap }});

  return documentVisitor.element;
};

module.exports = parse;
