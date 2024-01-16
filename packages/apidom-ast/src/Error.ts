import Node, { NodeConstructor } from './Node';

export interface ErrorConstructor extends NodeConstructor {
  value?: unknown;
  isUnexpected?: boolean;
}

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
  }: ErrorConstructor = {}) {
    super({ children, position, isMissing });
    this.value = value;
    this.isUnexpected = isUnexpected;
  }
}

export default Error;
