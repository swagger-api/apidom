/* eslint-disable max-classes-per-file */

export class Point {
  public readonly type: string = 'point';

  public row: number | null;

  public column: number | null;

  public char: number | null;

  constructor({
    row = null,
    column = null,
    char = null,
  }: { row?: number | null; column?: number | null; char?: number | null } = {}) {
    this.row = row;
    this.column = column;
    this.char = char;
  }
}

class Position {
  public type: string = 'position';

  public start: Point | null;

  public end: Point | null;

  constructor({ start = null, end = null }: { start?: Point | null; end?: Point | null } = {}) {
    this.start = start;
    this.end = end;
  }
}

export default Position;
