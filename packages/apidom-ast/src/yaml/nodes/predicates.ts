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

/**
 * @public
 */
export const isStream = (node: unknown): node is YamlStream => isNodeType('stream', node);

/**
 * @public
 */
export const isDocument = (node: unknown): node is YamlDocument => isNodeType('document', node);

/**
 * @public
 */
export const isMapping = (node: unknown): node is YamlMapping => isNodeType('mapping', node);

/**
 * @public
 */
export const isSequence = (node: unknown): node is YamlSequence => isNodeType('sequence', node);

/**
 * @public
 */
export const isKeyValuePair = (node: unknown): node is YamlKeyValuePair =>
  isNodeType('keyValuePair', node);

/**
 * @public
 */
export const isTag = (node: unknown): node is YamlTag => isNodeType('tag', node);

/**
 * @public
 */
export const isAnchor = (node: unknown): node is YamlAnchor => isNodeType('anchor', node);

/**
 * @public
 */
export const isScalar = (node: unknown): node is YamlScalar => isNodeType('scalar', node);

/**
 * @public
 */
export const isAlias = (node: unknown): node is YamlAlias => isNodeType('alias', node);

/**
 * @public
 */
export const isDirective = (node: unknown): node is YamlDirective => isNodeType('directive', node);

/**
 * @public
 */
export const isComment = (node: unknown): node is YamlComment => isNodeType('comment', node);
