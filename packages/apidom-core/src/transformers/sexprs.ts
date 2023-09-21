import stampit from 'stampit';
import { Element } from 'minim';

import { visit } from '../traversal/visitor';

const SymbolicExpressionsVisitor = stampit({
  props: {
    nestingLevel: 0,
    result: '',
  },
  methods: {
    enter(element: Element) {
      const { element: elementName } = element;
      const capitalizedElementName = elementName.charAt(0).toUpperCase() + elementName.slice(1);
      const indent = '  '.repeat(this.nestingLevel);
      this.result += this.nestingLevel > 0 ? '\n' : '';
      this.result += `${indent}(${capitalizedElementName}Element`;
      this.nestingLevel += 1;
    },
    leave() {
      this.nestingLevel -= 1;
      this.result += ')';
    },
  },
});

// transforms ApiDOM into S-expressions (Symbolic Expressions)
const sexprs = (element: Element): string => {
  const visitor = SymbolicExpressionsVisitor();
  visit(element, visitor);
  return visitor.result;
};

export default sexprs;
