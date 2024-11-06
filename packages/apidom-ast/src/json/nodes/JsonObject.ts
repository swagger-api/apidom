import JsonNode from './JsonNode.ts';
import { isProperty } from './predicates.ts';
import type JsonProperty from './JsonProperty.ts';

class JsonObject extends JsonNode {
  public static readonly type = 'object';

  public get properties(): Array<JsonProperty> {
    return this.children.filter(isProperty);
  }
}

export default JsonObject;
