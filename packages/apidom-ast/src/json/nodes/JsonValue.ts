import JsonNode from './JsonNode';
import type { NodeOptions } from '../../Node';

export interface JsonValueOptions extends NodeOptions {
  value: string;
}

class JsonValue extends JsonNode {
  public static readonly type: string = 'value';

  public readonly value: string;

  constructor({ value, ...rest }: JsonValueOptions) {
    super({ ...rest });
    this.value = value;
  }
}

export default JsonValue;
