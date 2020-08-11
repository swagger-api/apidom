import { ArrayElement, Element, Attributes, Meta } from 'minim';

interface Position {
  row: number;
  column: number;
  char: number;
}

interface PositionRange {
  start: Position;
  end: Position;
}

class SourceMap extends ArrayElement {
  constructor(content: Array<any>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'sourceMap';
  }

  get positionStart(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('position')).first;
  }

  get positionEnd(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('position')).second;
  }

  set position(position: PositionRange | null) {
    if (position === null) {
      return;
    }

    const start = new ArrayElement([
      position.start.row,
      position.start.column,
      position.start.char,
    ]);
    const end = new ArrayElement([position.end.row, position.end.column, position.end.char]);

    start.classes.push('position');
    end.classes.push('position');

    this.push(start).push(end);
  }
}

export default SourceMap;
