import JsonNode from './JsonNode.ts';
import type { NodeOptions } from '../../Node.ts';

/**
 * @public
 */
export interface JsonValueOptions extends NodeOptions {
  value: string;
}

/**
 * @public
 */
class JsonValue extends JsonNode {
  public static readonly type: string = 'value';

  public readonly value: string;

  constructor({ value, ...rest }: JsonValueOptions) {
    super({ ...rest });
    this.value = value;
  }
}

export default JsonValue;
