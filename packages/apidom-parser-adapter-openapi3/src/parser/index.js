'use strict';

const apiDOM = require('apidom');
const openapi3 = require('apidom-ns-openapi3');
const jsonAst = require('json-ast');
const ParseResultVisitor = require('./visitors/ParseResult');

const parse = source => {
    const namespace = apiDOM.createNamespace(openapi3);
    const ast = jsonAst.parse(source, {verbose: true, junker: true});

    const parseResultVisitor = new ParseResultVisitor(namespace);
    ast.accept(parseResultVisitor);

    return parseResultVisitor.result;
};

module.exports = parse;
