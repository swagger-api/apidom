import { isNodeType } from '../../predicates';

export const isString = isNodeType('string');

export const isFalse = isNodeType('false');

export const isTrue = isNodeType('true');

export const isNull = isNodeType('null');

export const isNumber = isNodeType('number');

export const isArray = isNodeType('array');

export const isObject = isNodeType('object');

export const isStringContent = isNodeType('stringContent');

export const isEscapeSequence = isNodeType('escapeSequence');

export const isProperty = isNodeType('property');
