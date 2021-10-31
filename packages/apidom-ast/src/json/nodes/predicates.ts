import { isNodeType } from '../../predicates';

export const isDocument = isNodeType.bind(undefined, 'document');

export const isString = isNodeType.bind(undefined, 'string');

export const isFalse = isNodeType.bind(undefined, 'false');

export const isTrue = isNodeType.bind(undefined, 'true');

export const isNull = isNodeType.bind(undefined, 'null');

export const isNumber = isNodeType.bind(undefined, 'number');

export const isArray = isNodeType.bind(undefined, 'array');

export const isObject = isNodeType.bind(undefined, 'object');

export const isStringContent = isNodeType.bind(undefined, 'stringContent');

export const isEscapeSequence = isNodeType.bind(undefined, 'escapeSequence');

export const isProperty = isNodeType.bind(undefined, 'property');

export const isKey = isNodeType.bind(undefined, 'key');
