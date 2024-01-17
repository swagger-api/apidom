import Node from './Node';
import Position from './Position';

class Literal extends Node {
  public readonly type: string = 'literal';

  public value: unknown;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    value = null,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    value?: unknown;
  } = {}) {
    super({ children, position, isMissing });
    this.value = value;
  }
}

export default Literal;
