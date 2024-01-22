import {
  Element,
  BooleanElement,
  NumberElement,
  StringElement,
  ArrayElement,
  ObjectElement,
} from 'minim';

import { visit } from '../../traversal/visitor';
import serializeValue from './value';

interface YamlVisitorOptions {
  readonly directive?: boolean;
  readonly indent?: number;
}

class YamlVisitor {
  protected static readonly indentChar = '  ';

  public result: string;

  protected readonly indent: number;

  constructor({ directive = false, indent = 0 }: YamlVisitorOptions = {}) {
    this.result = directive ? '%YAML 1.2\n---\n' : '';
    this.indent = indent;
  }

  public NumberElement(element: NumberElement): void {
    this.result += serializeValue(element);
  }

  public BooleanElement(element: BooleanElement): void {
    const value = serializeValue(element);
    this.result += value ? 'true' : 'false';
  }

  public StringElement(element: StringElement): void {
    // for simplicity and avoiding ambiguity we always wrap strings in quotes
    this.result += JSON.stringify(serializeValue(element));
  }

  public NullElement(): void {
    this.result += 'null';
  }

  public ArrayElement(element: ArrayElement): false {
    if (element.length === 0) {
      this.result += '[]';
      return false;
    }

    element.forEach((item) => {
      const visitor = new YamlVisitor({ indent: this.indent + 1 });
      const indent = YamlVisitor.indentChar.repeat(this.indent);

      visit(item, visitor);

      const { result } = visitor;

      this.result += result.startsWith('\n') ? `\n${indent}-${result}` : `\n${indent}- ${result}`;
    });

    return false;
  }

  public ObjectElement(element: ObjectElement): false {
    if (element.length === 0) {
      this.result += '{}';
      return false;
    }

    element.forEach((value, key) => {
      const keyVisitor = new YamlVisitor({ indent: this.indent + 1 });
      const valueVisitor = new YamlVisitor({ indent: this.indent + 1 });
      const indent = YamlVisitor.indentChar.repeat(this.indent);

      visit(key, keyVisitor);
      visit(value, valueVisitor);

      const { result: keyResult } = keyVisitor;
      const { result: valueResult } = valueVisitor;

      this.result += valueResult.startsWith('\n')
        ? `\n${indent}${keyResult}:${valueResult}`
        : `\n${indent}${keyResult}: ${valueResult}`;
    });

    return false;
  }
}

const serializer = (element: Element, { directive = false } = {}): string => {
  const visitor = new YamlVisitor({ directive });

  visit(element, visitor);

  return visitor.result;
};

export default serializer;
