import stampit from 'stampit';

interface Point {
  row: number | null;
  column: number | null;
  char: number | null;
}

interface Position {
  type: 'position';
  startPosition: Point | null;
  endPosition: Point | null;
}

export const Point: stampit.Stamp<Point> = stampit({
  props: {
    type: 'point',
    row: null,
    column: null,
    char: null,
  },
  init({ row = null, column = null, char = null } = {}) {
    this.row = row;
    this.column = column;
    this.char = char;
  },
});

const Position: stampit.Stamp<Position> = stampit({
  props: {
    type: 'position',
    start: null,
    end: null,
  },
  init({ start = null, end = null } = {}) {
    this.start = start;
    this.end = end;
  },
});

export default Position;
