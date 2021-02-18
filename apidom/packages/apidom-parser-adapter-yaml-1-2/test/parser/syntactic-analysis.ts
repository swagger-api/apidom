// @ts-ignore
import { assert } from 'chai';
// @ts-ignore
import Parser from 'tree-sitter';
// @ts-ignore
import YAMLLanguage from 'tree-sitter-yaml';
import { ParseResult } from 'apidom-ast';

import { analyze } from '../../src/parser/syntactic-analysis';

describe('yaml', function () {
  context('transformers', function () {
    context('tree-sitter-yaml', function () {
      context('given error-less CST to AST transformation', function () {
        let cst: Parser.Tree;
        let ast: ParseResult;

        beforeEach(function () {
          const parser = new Parser();
          parser.setLanguage(YAMLLanguage);

          const jsonString = 'prop: !!bool "true"';

          cst = parser.parse(jsonString);
          ast = analyze(cst);
          // const util = require('util');
          // console.log(util.inspect(ast, { showHidden: false, compact: false, depth: null }));
        });

        context('ParseResult', function () {
          specify('should be the result of transformation', function () {
            assert.propertyVal(ast, 'type', 'parseResult');
          });
        });
      });
    });
  });
});
