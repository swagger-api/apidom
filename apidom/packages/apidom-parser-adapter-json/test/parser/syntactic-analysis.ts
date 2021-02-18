// @ts-ignore
import Parser from 'tree-sitter';
import { assert } from 'chai';
// @ts-ignore
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
  visit,
} from 'apidom-ast';
import { analyze, keyMap } from '../../src/parser/syntactic-analysis';

context('parser', function () {
  context('syntactic-analysis', function () {
    context('analyze', function () {
      context('given error-less CST to AST transformation', function () {
        let cst: Parser.Tree;
        let ast: ParseResult;

        beforeEach(function () {
          const parser = new Parser();
          parser.setLanguage(JSONLanguage);

          const jsonString = '{"prop": [1, null, true, false, "a"]}';
          cst = parser.parse(jsonString);
          ast = analyze(cst);
        });

        context('ParseResult', function () {
          specify('should be the result of transformation', function () {
            assert.propertyVal(ast, 'type', 'parseResult');
          });
        });

        context('JsonDocument', function () {
          specify('should be part of resulting AST', function () {
            assert.propertyVal(ast.rootNode, 'type', 'document');
          });

          specify('should have Position', function () {
            // @ts-ignore
            assert.deepEqual(ast.rootNode.position, {
              type: 'position',
              start: { type: 'point', row: 0, column: 0, char: 0 },
              end: { type: 'point', row: 0, column: 37, char: 37 },
            });
          });
        });

        context('JsonObject', function () {
          specify('should be part of resulting AST', function () {
            // @ts-ignore
            assert.propertyVal(ast.rootNode.child, 'type', 'object');
          });

          specify('should have Position', function () {
            // @ts-ignore
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
            // @ts-ignore
            ({ child: objectNode } = ast.rootNode);
          });

          specify('should be part of resulting AST', function () {
            // @ts-ignore
            assert.propertyVal(objectNode.properties[0], 'type', 'property');
          });

          specify('should appear in AST specific number of times', function () {
            // @ts-ignore
            assert.lengthOf(objectNode.properties, 1);
          });

          specify('should have Position', function () {
            // @ts-ignore
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
            // @ts-ignore
            [{ value: arrayNode }] = ast.rootNode.child.properties;
          });

          specify('should be part of resulting AST', function () {
            assert.propertyVal(arrayNode, 'type', 'array');
          });

          specify('should have specific number of items', function () {
            // @ts-ignore
            assert.lengthOf(arrayNode.items, 5);
          });

          specify('should have Position', function () {
            assert.deepEqual(arrayNode.position, {
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 9, char: 9 },
              end: { type: 'point', row: 0, column: 36, char: 36 },
            });
          });
        });

        context('JsonNumber', function () {
          let numberNode: JsonNumber;

          beforeEach(function () {
            // @ts-ignore
            [numberNode] = ast.rootNode.child.properties[0].value.items;
          });

          specify('should be part of resulting AST', function () {
            assert.propertyVal(numberNode, 'type', 'number');
          });

          specify('should have Position', function () {
            assert.deepEqual(numberNode.position, {
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 10, char: 10 },
              end: { type: 'point', row: 0, column: 11, char: 11 },
            });
          });
        });

        context('JsonNull', function () {
          let nullNode: JsonNull;

          beforeEach(function () {
            // @ts-ignore
            [, nullNode] = ast.rootNode.child.properties[0].value.items;
          });

          specify('should be part of resulting AST', function () {
            assert.propertyVal(nullNode, 'type', 'null');
          });

          specify('should have Position', function () {
            assert.deepEqual(nullNode.position, {
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 13, char: 13 },
              end: { type: 'point', row: 0, column: 17, char: 17 },
            });
          });
        });

        context('JsonTrue', function () {
          let trueNode: JsonTrue;

          beforeEach(function () {
            // @ts-ignore
            [, , trueNode] = ast.rootNode.child.properties[0].value.items;
          });

          specify('should be part of resulting AST', function () {
            assert.propertyVal(trueNode, 'type', 'true');
          });

          specify('should have Position', function () {
            assert.deepEqual(trueNode.position, {
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 19, char: 19 },
              end: { type: 'point', row: 0, column: 23, char: 23 },
            });
          });
        });

        context('JsonFalse', function () {
          let falseNode: JsonFalse;

          beforeEach(function () {
            // @ts-ignore
            [, , , falseNode] = ast.rootNode.child.properties[0].value.items;
          });

          specify('should be part of resulting AST', function () {
            assert.propertyVal(falseNode, 'type', 'false');
          });

          specify('should have Position', function () {
            assert.deepEqual(falseNode.position, {
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 25, char: 25 },
              end: { type: 'point', row: 0, column: 30, char: 30 },
            });
          });
        });

        context('JsonString', function () {
          let stringNode: JsonString;

          beforeEach(function () {
            // @ts-ignore
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
              // @ts-ignore
              type: 'position',
              start: { type: 'point', row: 0, column: 32, char: 32 },
              end: { type: 'point', row: 0, column: 35, char: 35 },
            });
          });
        });
      });

      context('given CST containing errors', function () {
        context('missing nodes', function () {
          context('given object with missing ending bracket', function () {
            specify('should be part of the AST', function () {
              const parser = new Parser();
              parser.setLanguage(JSONLanguage);

              const jsonString = '{"prop": "value"';
              const cst = parser.parse(jsonString);
              const ast = analyze(cst);

              const visitor = {
                missing: [],
                // @ts-ignore
                enter(node) {
                  if (node.isMissing) {
                    // @ts-ignore
                    this.missing.push(node);
                  }
                },
              };

              // @ts-ignore
              visit(ast.rootNode, visitor, { keyMap });

              assert.lengthOf(visitor.missing, 1);
              assert.propertyVal(visitor.missing[0], 'type', 'literal');
              assert.propertyVal(visitor.missing[0], 'value', '}');
            });
          });

          context('given array with missing ending bracket', function () {
            specify('should be part of the AST', function () {
              const parser = new Parser();
              parser.setLanguage(JSONLanguage);

              const jsonString = '["a", 1';
              const cst = parser.parse(jsonString);
              const ast = analyze(cst);

              const visitor = {
                missing: [],
                // @ts-ignore
                enter(node) {
                  if (node.isMissing) {
                    // @ts-ignore
                    this.missing.push(node);
                  }
                },
              };

              // @ts-ignore
              visit(ast.rootNode, visitor, { keyMap });

              assert.lengthOf(visitor.missing, 1);
              assert.propertyVal(visitor.missing[0], 'type', 'literal');
              assert.propertyVal(visitor.missing[0], 'value', ']');
            });
          });
        });

        context('error nodes', function () {
          context('given object with missing colon', function () {
            specify('should be part of the AST', function () {
              const parser = new Parser();
              parser.setLanguage(JSONLanguage);

              const jsonString = '{"a" "b"}';
              const cst = parser.parse(jsonString);
              const ast = analyze(cst);

              const visitor = {
                errors: [],
                // @ts-ignore
                error(node) {
                  // @ts-ignore
                  this.errors.push(node);
                },
              };

              // @ts-ignore
              visit(ast.rootNode, visitor, { keyMap });

              assert.lengthOf(visitor.errors, 1);
              assert.propertyVal(visitor.errors[0], 'type', 'error');
            });
          });
        });

        context('unexpected nodes', function () {
          context('given object with unexpected symbols', function () {
            specify('should be part of the AST', function () {
              const parser = new Parser();
              parser.setLanguage(JSONLanguage);

              const jsonString = '{a: b}';
              const cst = parser.parse(jsonString);
              const ast = analyze(cst);

              const visitor = {
                errors: [],
                // @ts-ignore
                error(node) {
                  // @ts-ignore
                  this.errors.push(node);
                },
              };

              // @ts-ignore
              visit(ast.rootNode, visitor, { keyMap });

              assert.lengthOf(visitor.errors, 3);
              assert.propertyVal(visitor.errors[1], 'type', 'error');
              assert.propertyVal(visitor.errors[1], 'isUnexpected', true);
              assert.propertyVal(visitor.errors[2], 'type', 'error');
              assert.propertyVal(visitor.errors[2], 'isUnexpected', true);
            });
          });
        });

        specify('should support having error node as root node', function () {
          const parser = new Parser();
          parser.setLanguage(JSONLanguage);

          const jsonString = '^';
          const cst = parser.parse(jsonString);
          const ast = analyze(cst);

          assert.propertyVal(ast.rootNode, 'type', 'error');
          assert.propertyVal(ast.rootNode, 'isUnexpected', false);
          // @ts-ignore
          assert.propertyVal(ast.rootNode.children[0], 'type', 'error');
          // @ts-ignore
          assert.propertyVal(ast.rootNode.children[0], 'isUnexpected', true);
        });
      });
    });
  });
});
