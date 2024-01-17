import { isNodeType } from '../../predicates';
import type JsonDocument from './JsonDocument';
import type JsonString from './JsonString';
import type JsonFalse from './JsonFalse';
import type JsonTrue from './JsonTrue';
import type JsonNull from './JsonNull';
import type JsonNumber from './JsonNumber';
import type JsonArray from './JsonArray';
import type JsonObject from './JsonObject';
import type JsonStringContent from './JsonStringContent';
import type JsonEscapeSequence from './JsonEscapeSequence';
import type JsonProperty from './JsonProperty';
import type JsonKey from './JsonKey';

export const isDocument = (node: unknown): node is JsonDocument => isNodeType('document', node);

export const isString = (node: unknown): node is JsonString => isNodeType('string', node);

export const isFalse = (node: unknown): node is JsonFalse => isNodeType('false', node);

export const isTrue = (node: unknown): node is JsonTrue => isNodeType('true', node);

export const isNull = (node: unknown): node is JsonNull => isNodeType('null', node);

export const isNumber = (node: unknown): node is JsonNumber => isNodeType('number', node);

export const isArray = (node: unknown): node is JsonArray => isNodeType('array', node);

export const isObject = (node: unknown): node is JsonObject => isNodeType('object', node);

export const isStringContent = (node: unknown): node is JsonStringContent =>
  isNodeType('stringContent', node);

export const isEscapeSequence = (node: unknown): node is JsonEscapeSequence =>
  isNodeType('escapeSequence', node);

export const isProperty = (node: unknown): node is JsonProperty => isNodeType('property', node);

export const isKey = (node: unknown): node is JsonKey => isNodeType('key', node);
