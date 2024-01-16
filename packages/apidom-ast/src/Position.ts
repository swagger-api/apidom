/* eslint-disable max-classes-per-file */

interface PointConstructor {
  row?: number | null;
  column?: number | null;
  char?: number | null;
}

export class Point {
  public readonly type: string = 'point';

  public row: number | null;

  public column: number | null;

  public char: number | null;

  constructor({ row = null, column = null, char = null }: PointConstructor = {}) {
    this.row = row;
    this.column = column;
    this.char = char;
  }
}

interface PositionConstructor {
  start?: Point | null;
  end?: Point | null;
}

class Position {
  public type: string = 'position';

  public start: Point | null;

  public end: Point | null;

  constructor({ start = null, end = null }: PositionConstructor = {}) {
    this.start = start;
    this.end = end;
  }
}

export default Position;
