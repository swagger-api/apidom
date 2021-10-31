import { isNodeType } from '../../predicates';

export const isStream = isNodeType.bind(undefined, 'stream');

export const isDocument = isNodeType.bind(undefined, 'document');

export const isMapping = isNodeType.bind(undefined, 'mapping');

export const isSequence = isNodeType.bind(undefined, 'sequence');

export const isKeyValuePair = isNodeType.bind(undefined, 'keyValuePair');

export const isTag = isNodeType.bind(undefined, 'tag');

export const isScalar = isNodeType.bind(undefined, 'scalar');

export const isAlias = isNodeType.bind(undefined, 'alias');

export const isDirective = isNodeType.bind(undefined, 'directive');

export const isComment = isNodeType.bind(undefined, 'comment');
