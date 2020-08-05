import Parser from 'tree-sitter';
import { assert } from 'chai';
import JSONLanguage from 'tree-sitter-json';
import {
  ParseResult,
  JsonArray,
  JsonObject,
  JsonNumber,
  JsonNull,
  JsonTrue,
  JsonFalse,
  JsonString,
} from 'apidom-ast';

import { transform } from '../../src/parser/cst';

describe('tree-sitter', function () {
  context('given CST containing errors', function () {
    context('MISSING CST nodes', function () {
      context('given object with missing ending bracket', function () {
        let cst: Parser.Tree;
        let ast: ParseResult;

        beforeEach(function () {
          const parser = new Parser();
          parser.setLanguage(JSONLanguage);

          const jsonString = '{"prop": "value"';
          cst = parser.parse(jsonString);
          ast = transform(cst);
        });

        specify('should be part of resulting AST', function () {
          assert.propertyVal(ast.rootNode.child.children[1], 'type', 'missing');
        });

        specify('should accumulate into annotations collection', function () {
          assert.lengthOf(ast.annotations, 1);
          assert.strictEqual(ast.annotations[0], ast.rootNode.child.children[1]);
        });
      });

      context('given array with missing ending bracket', function () {
        let cst: Parser.Tree;
        let ast: ParseResult;

        beforeEach(function () {
          const parser = new Parser();
          parser.setLanguage(JSONLanguage);

          const jsonString = '["a", 1';
          cst = parser.parse(jsonString);
          ast = transform(cst);
        });

        specify('should be part of resulting AST', function () {
          assert.propertyVal(ast.rootNode.child.children[2], 'type', 'missing');
        });

        specify('should accumulate into annotations collection', function () {
          assert.lengthOf(ast.annotations, 1);
          assert.strictEqual(ast.annotations[0], ast.rootNode.child.children[2]);
        });
      });
    });
  });

  context('given error-less CST to AST transformation', function () {
    let cst: Parser.Tree;
    let ast: ParseResult;

    beforeEach(function () {
      const parser = new Parser();
      parser.setLanguage(JSONLanguage);

      const jsonString = '{"prop": [1, null, true, false, "a"]}';
      cst = parser.parse(jsonString);
      ast = transform(cst);
    });

    context('ParseResult', function () {
      specify('should be the result of transformation', function () {
        assert.propertyVal(ast, 'type', 'parseResult');
      });

      specify('should have no errors', function () {
        assert.lengthOf(ast.errors, 0);
      });

      specify('should have no annotations', function () {
        assert.lengthOf(ast.annotations, 0);
      });
    });

    context('JsonDocument', function () {
      specify('should be part of resulting AST', function () {
        assert.propertyVal(ast.rootNode, 'type', 'document');
      });

      specify('should have Position', function () {
        assert.deepEqual(ast.rootNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 0, char: 0 },
          end: { type: 'point', row: 0, column: 37, char: 37 },
        });
      });
    });

    context('JsonObject', function () {
      specify('should be part of resulting AST', function () {
        assert.propertyVal(ast.rootNode.child, 'type', 'object');
      });

      specify('should have Position', function () {
        assert.deepEqual(ast.rootNode.child.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 0, char: 0 },
          end: { type: 'point', row: 0, column: 37, char: 37 },
        });
      });
    });

    context('JsonProperty', function () {
      let objectNode: JsonObject;

      beforeEach(function () {
        ({ child: objectNode } = ast.rootNode);
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(objectNode.properties[0], 'type', 'property');
      });

      specify('should appear in AST specific number of times', function () {
        assert.lengthOf(objectNode.properties, 1);
      });

      specify('should have Position', function () {
        assert.deepEqual(objectNode.properties[0].position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 1, char: 1 },
          end: { type: 'point', row: 0, column: 36, char: 36 },
        });
      });
    });

    context('JsonArray', function () {
      let arrayNode: JsonArray;

      beforeEach(function () {
        [{ value: arrayNode }] = ast.rootNode.child.properties;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(arrayNode, 'type', 'array');
      });

      specify('should have specific number of items', function () {
        assert.lengthOf(arrayNode.items, 5);
      });

      specify('should have Position', function () {
        assert.deepEqual(arrayNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 9, char: 9 },
          end: { type: 'point', row: 0, column: 36, char: 36 },
        });
      });
    });

    context('JsonNumber', function () {
      let numberNode: JsonNumber;

      beforeEach(function () {
        [numberNode] = ast.rootNode.child.properties[0].value.items;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(numberNode, 'type', 'number');
      });

      specify('should have Position', function () {
        assert.deepEqual(numberNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 10, char: 10 },
          end: { type: 'point', row: 0, column: 11, char: 11 },
        });
      });
    });

    context('JsonNull', function () {
      let nullNode: JsonNull;

      beforeEach(function () {
        [, nullNode] = ast.rootNode.child.properties[0].value.items;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(nullNode, 'type', 'null');
      });

      specify('should have Position', function () {
        assert.deepEqual(nullNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 13, char: 13 },
          end: { type: 'point', row: 0, column: 17, char: 17 },
        });
      });
    });

    context('JsonTrue', function () {
      let trueNode: JsonTrue;

      beforeEach(function () {
        [, , trueNode] = ast.rootNode.child.properties[0].value.items;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(trueNode, 'type', 'true');
      });

      specify('should have Position', function () {
        assert.deepEqual(trueNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 19, char: 19 },
          end: { type: 'point', row: 0, column: 23, char: 23 },
        });
      });
    });

    context('JsonFalse', function () {
      let falseNode: JsonFalse;

      beforeEach(function () {
        [, , , falseNode] = ast.rootNode.child.properties[0].value.items;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(falseNode, 'type', 'false');
      });

      specify('should have Position', function () {
        assert.deepEqual(falseNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 25, char: 25 },
          end: { type: 'point', row: 0, column: 30, char: 30 },
        });
      });
    });

    context('JsonString', function () {
      let stringNode: JsonString;

      beforeEach(function () {
        [, , , , stringNode] = ast.rootNode.child.properties[0].value.items;
      });

      specify('should be part of resulting AST', function () {
        assert.propertyVal(stringNode, 'type', 'string');
      });

      specify('should have specific string value', function () {
        assert.propertyVal(stringNode, 'value', 'a');
      });

      specify('should have Position', function () {
        assert.deepEqual(stringNode.position, {
          type: 'position',
          start: { type: 'point', row: 0, column: 32, char: 32 },
          end: { type: 'point', row: 0, column: 35, char: 35 },
        });
      });
    });
  });
});
