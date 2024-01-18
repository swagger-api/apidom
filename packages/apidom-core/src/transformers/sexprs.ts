import { Element } from 'minim';

import { visit } from '../traversal/visitor';

class SymbolicExpressionsVisitor {
  public result: string = '';

  private nestingLevel: number = 0;

  public enter(element: Element): void {
    const { element: elementName } = element;
    const capitalizedElementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
    const indent = '  '.repeat(this.nestingLevel);
    this.result += this.nestingLevel > 0 ? '\n' : '';
    this.result += `${indent}(${capitalizedElementName}Element`;
    this.nestingLevel += 1;
  }

  public leave(): void {
    this.nestingLevel -= 1;
    this.result += ')';
  }
}

// transforms ApiDOM into S-expressions (Symbolic Expressions)
const sexprs = (element: Element): string => {
  const visitor = new SymbolicExpressionsVisitor();
  visit(element, visitor);
  return visitor.result;
};

export default sexprs;
