import Node from './Node';
import Position from './Position';

class Error extends Node {
  public readonly type: string = 'error';

  public value: unknown;

  public isUnexpected: boolean;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    value = null,
    isUnexpected = false,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    value?: unknown;
    isUnexpected?: boolean;
  } = {}) {
    super({ children, position, isMissing });
    this.value = value;
    this.isUnexpected = isUnexpected;
  }
}

export default Error;
