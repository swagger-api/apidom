import Position from './Position.ts';

/**
 * @public
 */
export interface NodeOptions {
  readonly children?: unknown[];
  readonly position?: Position;
  readonly isMissing?: boolean;
  readonly startPositionRow?: number;
  readonly startPositionColumn?: number;
  readonly startIndex?: number;
  readonly endPositionRow?: number;
  readonly endPositionColumn?: number;
  readonly endIndex?: number;
}

/**
 * @public
 */
class Node {
  public static readonly type: string = 'node';

  public readonly type: string = 'node';

  public readonly isMissing: boolean;

  public children: unknown[];

  public startPositionRow?: number;

  public startPositionColumn?: number;

  public startIndex?: number;

  public endPositionRow?: number;

  public endPositionColumn?: number;

  public endIndex?: number;

  constructor({
    children = [],
    isMissing = false,
    startPositionRow,
    startPositionColumn,
    startIndex,
    endPositionRow,
    endPositionColumn,
    endIndex,
  }: NodeOptions = {}) {
    this.type = (this.constructor as typeof Node).type;
    this.isMissing = isMissing;
    this.children = children;
    this.startPositionRow = startPositionRow;
    this.startPositionColumn = startPositionColumn;
    this.startIndex = startIndex;
    this.endPositionRow = endPositionRow;
    this.endPositionColumn = endPositionColumn;
    this.endIndex = endIndex;
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
