'use strict';

const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');
const jsonAst = require('json-ast');
const { specification } = require('./specification');
const { visit } = require('./visitor');

const parse = (source, { sourceMap = false, verbose = true, junker = true, specObj = specification } = {}) => {
  const namespace = apiDOM.createNamespace(openapi3);
  const parseResultElement = new namespace.elements.ParseResult();
  const documentVisitor = specObj.visitors.document.$visitor();
  let ast = null;

  try {
    ast = jsonAst.parse(source, {verbose, junker});
    visit(ast, documentVisitor, { state: { namespace, specObj, sourceMap, element: parseResultElement }});
    return documentVisitor.element;
  } catch (error) {
    const annotation = new namespace.elements.Annotation(error.message)
    annotation.classes.push('error');
    parseResultElement.push(annotation);
    return parseResultElement;
  }
};

module.exports = parse;
