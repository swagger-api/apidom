import JsonNode from './JsonNode.ts';
import { isFalse, isTrue, isNull, isNumber, isString, isArray, isObject } from './predicates.ts';

class JsonArray extends JsonNode {
  public static readonly type = 'array';

  public get items(): unknown[] {
    return this.children.filter(
      (node: unknown) =>
        isFalse(node) ||
        isTrue(node) ||
        isNull(node) ||
        isNumber(node) ||
        isString(node) ||
        isArray(node) ||
        isObject,
    );
  }
}

export default JsonArray;
