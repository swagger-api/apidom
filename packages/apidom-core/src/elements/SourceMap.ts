import { ArrayElement, Element, Attributes, Meta } from 'minim';

/**
 * @public
 */
export interface Position {
  row: number;
  column: number;
  char: number;
}

/**
 * @public
 */
export interface PositionRange {
  start: Position;
  end: Position;
}

/**
 * @public
 */
class SourceMap extends ArrayElement {
  constructor(content?: Array<any>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sourceMap';
  }

  get positionStart(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('position')).get(0);
  }

  get positionEnd(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('position')).get(1);
  }

  set position(position: PositionRange | undefined) {
    if (typeof position === 'undefined') {
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
