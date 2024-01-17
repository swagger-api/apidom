import JsonNode from './JsonNode';
import type { NodeOptions } from '../../Node';

export interface JsonValueOptions extends NodeOptions {
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
