import Node, { NodeConstructor } from './Node';

interface LiteralConstructor extends NodeConstructor {
  value?: unknown;
}

class Literal extends Node {
  public readonly type: string = 'literal';

  public value: unknown;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    value = null,
  }: LiteralConstructor = {}) {
    super({ children, position, isMissing });
    this.value = value;
  }
}

export default Literal;
