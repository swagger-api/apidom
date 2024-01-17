import Node from './Node';
import type { NodeOptions } from './Node';

export interface ErrorOptions extends NodeOptions {
  readonly value?: unknown;
  readonly isUnexpected?: boolean;
}

class Error extends Node {
  public static readonly type: string = 'error';

  public readonly value: unknown;

  public readonly isUnexpected: boolean;

  constructor({ value, isUnexpected = false, ...rest }: ErrorOptions = {}) {
    super({ ...rest });
    this.value = value;
    this.isUnexpected = isUnexpected;
  }
}

export default Error;
