// @ts-ignore
import { namespace } from 'apidom-parser-adapter-openapi-json-3-1';

export class SourceMap {
  constructor(
    offset: number,
    length: number,
    line: number,
    column: number,
    endLine?: number,
    endColumn?: number,
    endOffset?: number,
  ) {
    this.length = length;
    this.offset = offset;
    this.line = line;
    this.column = column;
    this.endLine = endLine;
    this.endColumn = endColumn;
    this.endOffset = endOffset;
  }

  offset: number;

  length: number;

  line: number;

  column: number;

  endLine: number | undefined;

  endColumn: number | undefined;

  endOffset: number | undefined;
}

export function getSourceMap(element: namespace.Element): SourceMap {
  if (element && element.meta && element.meta.get('sourceMap')) {
    const sourceMap: [][number] = element.meta.get('sourceMap').toValue() as [][number];
    const offset = sourceMap[0][2];
    const length = sourceMap[1][2] - sourceMap[0][2];
    const line = sourceMap[0][0];
    const column = sourceMap[0][1];
    const endLine = sourceMap[1][0];
    const endColumn = sourceMap[1][1];
    const endOffset = sourceMap[1][2];
    return new SourceMap(offset, length, line, column, endLine, endColumn, endOffset); // TODO ???
  }
  return new SourceMap(1, 2, 0, 1); // TODO ???
}
