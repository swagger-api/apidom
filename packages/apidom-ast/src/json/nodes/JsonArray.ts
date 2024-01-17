import JsonNode from './JsonNode';
import { isFalse, isTrue, isNull, isNumber, isString, isArray, isObject } from './predicates';

class JsonArray extends JsonNode {
  public static readonly type: string = 'array';

  public get items(): unknown[] {
    // @ts-ignore
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
