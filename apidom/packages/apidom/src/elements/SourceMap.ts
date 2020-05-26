import { ArrayElement, Element, Attributes, Meta } from 'minim';

interface Position {
  line: number;
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

  set position(position: PositionRange) {
    if (position === null) {
      return;
    }

    const start = new ArrayElement([
      position.start.line,
      position.start.column,
      position.start.char,
    ]);
    const end = new ArrayElement([position.end.line, position.end.column, position.end.char]);

    start.classes.push('position');
    end.classes.push('position');

    this.push(start).push(end);
  }
}

export default SourceMap;
