import JsonNode from './JsonNode';
import JsonProperty from './JsonProperty';
import { isProperty } from './predicates';

class JsonObject extends JsonNode {
  public static readonly type: string = 'object';

  public get properties(): Array<JsonProperty> {
    // @ts-ignore
    return this.children.filter(isProperty);
  }
}

export default JsonObject;
