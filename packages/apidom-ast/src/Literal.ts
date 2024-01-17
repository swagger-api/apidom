import Node from './Node';
import type { NodeOptions } from './Node';

export interface LiteralOptions extends NodeOptions {
  readonly value?: unknown;
}

class Literal extends Node {
  public static readonly type: string = 'literal';

  public readonly value: unknown;

  constructor({ value, ...rest }: LiteralOptions = {}) {
    super({ ...rest });
    this.value = value;
  }
}

export default Literal;
