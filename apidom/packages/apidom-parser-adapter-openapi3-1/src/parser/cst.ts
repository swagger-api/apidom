import stampit from 'stampit';
import Parser from 'tree-sitter';
import {
  ParseResult,
  JsonDocument,
  JsonObject,
  JsonArray,
  Position,
  Point,
  JsonProperty,
  JsonString,
  JsonNumber,
  JsonNull,
  JsonTrue,
  JsonFalse,
} from 'apidom-ast';

import { visit } from './visitor';

const keyMap = {
  document: ['child'],
  object: ['properties'],
  array: ['items'],
  string: ['children'],
  property: ['key', 'value'],
};

const Visitor = stampit({
  props: {
    errors: [],
    annotations: [],
  },
  methods: {
    toPosition(node) {
      const start = Point({
        row: node.startPosition.row,
        column: node.startPosition.column,
        char: node.startIndex,
      });
      const end = Point({
        row: node.endPosition.row,
        column: node.endPosition.column,
        char: node.endIndex,
      });

      return Position({ start, end });
    },

    enter(node) {
      if (node.isMissing()) {
        this.annotations.push(node);
      }

      if (!node.isNamed) {
        return null;
      }

      return undefined;
    },
    ERROR(node) {
      this.errors.push(node);
      return null;
    },
    document(node) {
      const position = this.toPosition(node);

      return JsonDocument({ child: node.children[0], position });
    },
    object(node) {
      const position = this.toPosition(node);

      return JsonObject({ properties: node.children, position });
    },
    pair(node) {
      const position = this.toPosition(node);
      const key = node.firstNamedChild;
      const value = node.lastNamedChild;

      return JsonProperty({ key, value, position });
    },
    array(node) {
      const position = this.toPosition(node);
      const { children: items } = node;

      return JsonArray({ items, position });
    },
    string(node) {
      const position = this.toPosition(node);
      const value = node.namedChildren.reduce(
        (acc: string, cur: string): string => acc + cur.text,
        '',
      );

      return JsonString({ value, position });
    },
    number(node) {
      const position = this.toPosition(node);
      const value = node.text;

      return JsonNumber({ value, position });
    },
    null(node) {
      const position = this.toPosition(node);
      const value = node.text;

      return JsonNull({ value, position });
    },
    true(node) {
      const position = this.toPosition(node);
      const value = node.text;

      return JsonTrue({ value, position });
    },
    false(node) {
      const position = this.toPosition(node);
      const value = node.text;

      return JsonFalse({ value, position });
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const transform = (cst: Parser.Tree): ParseResult => {
  const visitor = Visitor();
  const parseResult = ParseResult();
  const jsonAst = visit(cst.rootNode, visitor, { keyMap });
  const { errors, annotations } = visitor;

  parseResult.errors = errors;
  parseResult.annotations = annotations;
  parseResult.rootNode = jsonAst;

  return parseResult;
};
