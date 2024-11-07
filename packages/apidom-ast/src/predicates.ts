import type Literal from './Literal.ts';
import Position, { Point } from './Position.ts';
import ParseResult from './ParseResult.ts';

export const isNodeType = (type: string, node: unknown): boolean =>
  node != null && typeof node === 'object' && 'type' in node && node.type === type;

export const isLiteral = (node: unknown): node is Literal => isNodeType('literal', node);
export const isPosition = (node: unknown): node is Position => isNodeType('position', node);

export const isPoint = (node: unknown): node is Point => isNodeType('point', node);

export const isParseResult = (node: unknown): node is ParseResult =>
  isNodeType('parseResult', node);
