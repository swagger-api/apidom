import type Literal from './Literal.ts';
import Position, { Point } from './Position.ts';
import ParseResult from './ParseResult.ts';

/**
 * @public
 */
export const isNodeType = (type: string, node: unknown): boolean =>
  node != null && typeof node === 'object' && 'type' in node && node.type === type;

/**
 * @public
 */
export const isLiteral = (node: unknown): node is Literal => isNodeType('literal', node);

/**
 * @public
 */
export const isPosition = (node: unknown): node is Position => isNodeType('position', node);

/**
 * @public
 */
export const isPoint = (node: unknown): node is Point => isNodeType('point', node);

/**
 * @public
 */
export const isParseResult = (node: unknown): node is ParseResult =>
  isNodeType('parseResult', node);
