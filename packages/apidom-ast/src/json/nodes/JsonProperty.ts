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

class JsonProperty extends JsonNode {
  public static readonly type: string = 'property';

  public get key(): JsonKey {
    // @ts-ignore
    return this.children.find(isKey);
  }

  public get value(): unknown {
    return this.children.find(
      (node: any) =>
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
