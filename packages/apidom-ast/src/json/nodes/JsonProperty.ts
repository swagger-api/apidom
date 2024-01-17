import JsonNode from './JsonNode';
import JsonKey from './JsonKey';
import {
  isArray,
  isFalse,
  isKey,
  isNull,
  isNumber,
  isObject,
  isString,
  isTrue,
} from './predicates';
import type JsonString from './JsonString';
import type JsonFalse from './JsonFalse';
import type JsonTrue from './JsonTrue';
import type JsonNull from './JsonNull';
import type JsonNumber from './JsonNumber';
import type JsonArray from './JsonArray';
import type JsonObject from './JsonObject';

type JsonValue = JsonFalse | JsonTrue | JsonNull | JsonNumber | JsonString | JsonArray | JsonObject;

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
