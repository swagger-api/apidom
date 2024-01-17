/* eslint-disable max-classes-per-file */

interface PointOptions {
  row?: number | null;
  column?: number | null;
  char?: number | null;
}

export class Point {
  public static readonly type: string = 'point';

  public readonly type: string = Point.type;

  public row: number | null;

  public column: number | null;

  public char: number | null;

  constructor({ row = null, column = null, char = null }: PointOptions = {}) {
    this.row = row;
    this.column = column;
    this.char = char;
  }
}

interface PositionOptions {
  start?: Point | null;
  end?: Point | null;
}

class Position {
  public static readonly type: string = 'position';

  public readonly type: string = Position.type;

  public start: Point | null;

  public end: Point | null;

  constructor({ start = null, end = null }: PositionOptions = {}) {
    this.start = start;
    this.end = end;
  }
}

export default Position;
