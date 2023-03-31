import stampit from 'stampit';
import {
  Element,
  BooleanElement,
  NumberElement,
  StringElement,
  ArrayElement,
  ObjectElement,
} from 'minim';

import { visit } from '../traversal/visitor';
import serializeValue from './value';

const YamlVisitor = stampit({
  props: {
    result: '',
    indent: 0,
    indentChar: '  ',
  },
  init({ directive = false, indent = 0, indentChar = '  ' } = {}) {
    this.result = directive ? '%YAML 1.2\n---\n' : '';
    this.indent = indent;
    this.indentChar = indentChar;
  },
  methods: {
    NumberElement(element: NumberElement) {
      this.result += serializeValue(element);
    },
    BooleanElement(element: BooleanElement) {
      const value = serializeValue(element);
      this.result += value ? 'true' : 'false';
    },
    StringElement(element: StringElement) {
      // for simplicity and avoiding ambiguity we always wrap strings in quotes
      this.result += JSON.stringify(serializeValue(element));
    },
    NullElement() {
      this.result += 'null';
    },
    ArrayElement(element: ArrayElement) {
      if (element.length === 0) {
        this.result += '[]';
        return false;
      }

      element.forEach((item) => {
        const visitor = YamlVisitor({ indent: this.indent + 1 });
        const indent = this.indentChar.repeat(this.indent);

        visit(item, visitor);

        const { result } = visitor;
        const startChar = this.result.endsWith('\n') ? '' : '\n';

        this.result += result.startsWith('\n')
          ? `${startChar}${indent}-${result}`
          : `${startChar}${indent}- ${result}`;
      });

      return false;
    },
    ObjectElement(element: ObjectElement) {
      if (element.length === 0) {
        this.result += '{}';
        return false;
      }

      element.forEach((value, key) => {
        const keyVisitor = YamlVisitor({ indent: this.indent + 1 });
        const valueVisitor = YamlVisitor({ indent: this.indent + 1 });
        const indent = this.indentChar.repeat(this.indent);

        visit(key, keyVisitor);
        visit(value, valueVisitor);

        const { result: keyResult } = keyVisitor;
        const { result: valueResult } = valueVisitor;
        const startChar = this.result.endsWith('\n') ? '' : '\n';

        this.result += valueResult.startsWith('\n')
          ? `${startChar}${indent}${keyResult}:${valueResult}`
          : `${startChar}${indent}${keyResult}: ${valueResult}`;
      });

      return false;
    },
  },
});

const serializer = (element: Element, { directive = false, indentChar = '  ' } = {}): string => {
  const visitor = YamlVisitor({ directive, indentChar });

  visit(element, visitor);

  return visitor.result;
};

export default serializer;
