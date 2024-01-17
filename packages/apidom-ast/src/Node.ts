import Position from './Position';

export interface NodeOptions {
  children?: unknown[];
  position?: Position | null;
  isMissing?: boolean;
}

class Node {
  public static readonly type: string = 'node';

  public readonly type: string | null = 'node';

  public isMissing: boolean;

  public children: unknown[];

  public position: Position | null;

  constructor({ children = [], position = null, isMissing = false }: NodeOptions = {}) {
    this.type = (this.constructor as unknown as Node).type;
    this.isMissing = isMissing;
    this.children = children;
    this.position = position;
  }

  // creates shallow clone of node
  public clone(): Node {
    // 1. copy has same prototype as orig
    const copy = Object.create(Object.getPrototypeOf(this));

    // 2. copy has all of orig’s properties
    Object.getOwnPropertyNames(this) // (1)
      .forEach((propKey) => {
        // (2)
        const descriptor = Object.getOwnPropertyDescriptor(this, propKey); // (3)
        // @ts-ignore
        Object.defineProperty(copy, propKey, descriptor); // (4)
      });

    return copy;
  }
}

export default Node;
