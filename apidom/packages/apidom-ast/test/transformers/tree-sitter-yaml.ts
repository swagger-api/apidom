// @ts-ignore
import Parser from 'tree-sitter';
import { assert } from 'chai';
// @ts-ignore
import YAMLLanguage from 'tree-sitter-yaml';

import { ParseResult, transformTreeSitterYamlCST as transform } from '../../src';

describe('tree-sitter-yaml', function () {
  context('given error-less CST to AST transformation', function () {
    let cst: Parser.Tree;
    let ast: ParseResult;

    beforeEach(function () {
      const parser = new Parser();
      parser.setLanguage(YAMLLanguage);

      const jsonString = '[1, null]';
      cst = parser.parse(jsonString);
      ast = transform(cst);
    });

    context('ParseResult', function () {
      specify('should be the result of transformation', function () {
        assert.propertyVal(ast, 'type', 'parseResult');
      });
    });
  });
});
