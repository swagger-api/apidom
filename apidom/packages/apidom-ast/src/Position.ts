import stampit from 'stampit';

interface Position {
  row: number;
  column: number;
}

const Position: stampit.Stamp<Position> = stampit({
  props: {
    row: null,
    column: null,
  },
  init({ row = null, column = null }) {
    this.row = row;
    this.column = column;
  },
});

export default Position;
