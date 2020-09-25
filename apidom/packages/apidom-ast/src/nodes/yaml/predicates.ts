import { isNodeType } from '../../predicates';

export const isStream = isNodeType('stream');

export const isDocument = isNodeType('document');

export const isMapping = isNodeType('mapping');

export const isSequence = isNodeType('sequence');

export const isKeyValuePair = isNodeType('keyValuePair');

export const isTag = isNodeType('tag');

export const isScalar = isNodeType('scalar');

export const isAlias = isNodeType('alias');

export const isDirective = isNodeType('directive');
