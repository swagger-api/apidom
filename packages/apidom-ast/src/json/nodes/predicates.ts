import { isNodeType } from '../../predicates.ts';
import type JsonDocument from './JsonDocument.ts';
import type JsonString from './JsonString.ts';
import type JsonFalse from './JsonFalse.ts';
import type JsonTrue from './JsonTrue.ts';
import type JsonNull from './JsonNull.ts';
import type JsonNumber from './JsonNumber.ts';
import type JsonArray from './JsonArray.ts';
import type JsonObject from './JsonObject.ts';
import type JsonStringContent from './JsonStringContent.ts';
import type JsonEscapeSequence from './JsonEscapeSequence.ts';
import type JsonProperty from './JsonProperty.ts';
import type JsonKey from './JsonKey.ts';

/**
 * @public
 */
export const isDocument = (node: unknown): node is JsonDocument => isNodeType('document', node);

/**
 * @public
 */
export const isString = (node: unknown): node is JsonString => isNodeType('string', node);

/**
 * @public
 */
export const isFalse = (node: unknown): node is JsonFalse => isNodeType('false', node);

/**
 * @public
 */
export const isTrue = (node: unknown): node is JsonTrue => isNodeType('true', node);

/**
 * @public
 */
export const isNull = (node: unknown): node is JsonNull => isNodeType('null', node);

/**
 * @public
 */
export const isNumber = (node: unknown): node is JsonNumber => isNodeType('number', node);

/**
 * @public
 */
export const isArray = (node: unknown): node is JsonArray => isNodeType('array', node);

/**
 * @public
 */
export const isObject = (node: unknown): node is JsonObject => isNodeType('object', node);

/**
 * @public
 */
export const isStringContent = (node: unknown): node is JsonStringContent =>
  isNodeType('stringContent', node);

/**
 * @public
 */
export const isEscapeSequence = (node: unknown): node is JsonEscapeSequence =>
  isNodeType('escapeSequence', node);

/**
 * @public
 */
export const isProperty = (node: unknown): node is JsonProperty => isNodeType('property', node);

/**
 * @public
 */
export const isKey = (node: unknown): node is JsonKey => isNodeType('key', node);
