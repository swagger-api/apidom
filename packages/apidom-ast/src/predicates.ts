import type Literal from './Literal.ts';
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
export const isParseResult = (node: unknown): node is ParseResult =>
  isNodeType('parseResult', node);
