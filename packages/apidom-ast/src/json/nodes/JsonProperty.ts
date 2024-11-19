import JsonNode from './JsonNode.ts';
import JsonKey from './JsonKey.ts';
import {
  isArray,
  isFalse,
  isKey,
  isNull,
  isNumber,
  isObject,
  isString,
  isTrue,
} from './predicates.ts';
import type JsonString from './JsonString.ts';
import type JsonFalse from './JsonFalse.ts';
import type JsonTrue from './JsonTrue.ts';
import type JsonNull from './JsonNull.ts';
import type JsonNumber from './JsonNumber.ts';
import type JsonArray from './JsonArray.ts';
import type JsonObject from './JsonObject.ts';

/**
 * @public
 */
export type JsonValue =
  | JsonFalse
  | JsonTrue
  | JsonNull
  | JsonNumber
  | JsonString
  | JsonArray
  | JsonObject;

/**
 * @public
 */
class JsonProperty extends JsonNode {
  public static readonly type = 'property';

  public get key(): JsonKey | undefined {
    return this.children.find(isKey);
  }

  public get value() {
    return this.children.find(
      (node: unknown): node is JsonValue =>
        isFalse(node) ||
        isTrue(node) ||
        isNull(node) ||
        isNumber(node) ||
        isString(node) ||
        isArray(node) ||
        isObject(node),
    );
  }
}

export default JsonProperty;
