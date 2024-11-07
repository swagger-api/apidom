import YamlAnchor from './YamlAnchor.ts';
import type YamlStream from './YamlStream.ts';
import type YamlDocument from './YamlDocument.ts';
import type YamlMapping from './YamlMapping.ts';
import type YamlSequence from './YamlSequence.ts';
import type YamlKeyValuePair from './YamlKeyValuePair.ts';
import type YamlTag from './YamlTag.ts';
import type YamlScalar from './YamlScalar.ts';
import type YamlAlias from './YamlAlias.ts';
import type YamlDirective from './YamlDirective.ts';
import type YamlComment from './YamlComment.ts';
import { isNodeType } from '../../predicates.ts';

export const isStream = (node: unknown): node is YamlStream => isNodeType('stream', node);

export const isDocument = (node: unknown): node is YamlDocument => isNodeType('document', node);

export const isMapping = (node: unknown): node is YamlMapping => isNodeType('mapping', node);

export const isSequence = (node: unknown): node is YamlSequence => isNodeType('sequence', node);

export const isKeyValuePair = (node: unknown): node is YamlKeyValuePair =>
  isNodeType('keyValuePair', node);

export const isTag = (node: unknown): node is YamlTag => isNodeType('tag', node);

export const isAnchor = (node: unknown): node is YamlAnchor => isNodeType('anchor', node);

export const isScalar = (node: unknown): node is YamlScalar => isNodeType('scalar', node);

export const isAlias = (node: unknown): node is YamlAlias => isNodeType('alias', node);

export const isDirective = (node: unknown): node is YamlDirective => isNodeType('directive', node);

export const isComment = (node: unknown): node is YamlComment => isNodeType('comment', node);
