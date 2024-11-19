import Node from './Node.ts';
import type { NodeOptions } from './Node.ts';

/**
 * @public
 */
export interface ErrorOptions extends NodeOptions {
  readonly value?: unknown;
  readonly isUnexpected?: boolean;
}

/**
 * @public
 */
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
