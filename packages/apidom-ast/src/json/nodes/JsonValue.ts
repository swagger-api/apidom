import JsonNode from './JsonNode';
import type { JsonNodeOptions } from './JsonNode';

export interface JsonValueOptions extends JsonNodeOptions {
  value?: unknown;
}

class JsonValue extends JsonNode {
  public static readonly type: string = 'value';

  public value: unknown;

  constructor({ value = null, ...rest }: JsonValueOptions = {}) {
    super({ ...rest });
    this.value = value;
  }
}

export default JsonValue;
