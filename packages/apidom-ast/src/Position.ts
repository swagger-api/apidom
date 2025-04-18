/* eslint-disable max-classes-per-file */

/**
 * @public
 */
export interface PointOptions {
  readonly row: number;
  readonly column: number;
  readonly char: number;
}

/**
 * @public
 */
export class Point {
  public static readonly type: string = 'point';

  public readonly type: string = Point.type;

  public readonly row: number;

  public readonly column: number;

  public readonly char: number;

  constructor({ row, column, char }: PointOptions) {
    this.row = row;
    this.column = column;
    this.char = char;
  }
}

/**
 * @public
 */
export interface PositionOptions {
  readonly start: Point;
  readonly end: Point;
}

/**
 * @public
 */
class Position {
  public static readonly type: string = 'position';

  public readonly type: string = Position.type;

  public readonly start: Point;

  public readonly end: Point;

  constructor({ start, end }: PositionOptions) {
    this.start = start;
    this.end = end;
  }
}

export default Position;
