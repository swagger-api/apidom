import Node from './Node';
import type { NodeOptions } from './Node';

export interface ErrorOptions extends NodeOptions {
  value?: unknown;
  isUnexpected?: boolean;
}

class Error extends Node {
  public static readonly type: string = 'error';

  public value: unknown;

  public isUnexpected: boolean;

  constructor({ value = null, isUnexpected = false, ...rest }: ErrorOptions = {}) {
    super({ ...rest });
    this.value = value;
    this.isUnexpected = isUnexpected;
  }
}

export default Error;
