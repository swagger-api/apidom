import Node from './Node';
import type { NodeOptions } from './Node';

export interface LiteralOptions extends NodeOptions {
  value?: unknown;
}

class Literal extends Node {
  public static readonly type: string = 'literal';

  public value: unknown;

  constructor({ value = null, ...rest }: LiteralOptions = {}) {
    super({ ...rest });
    this.value = value;
  }
}

export default Literal;
