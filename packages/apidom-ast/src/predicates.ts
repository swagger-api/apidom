import { pathEq } from 'ramda';

export const isNodeType = pathEq(['type']);

export const isLiteral = isNodeType('literal');

export const isPosition = isNodeType('position');

export const isPoint = isNodeType('point');

export const isParseResult = isNodeType('parseResult');
