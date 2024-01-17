import JsonNode from './JsonNode';
import { isProperty } from './predicates';
import type JsonProperty from './JsonProperty';

class JsonObject extends JsonNode {
  public static readonly type = 'object';

  public get properties(): Array<JsonProperty> {
    return this.children.filter(isProperty);
  }
}

export default JsonObject;
