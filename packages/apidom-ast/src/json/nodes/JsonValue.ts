import JsonNode from './JsonNode';
import Position from '../../Position';

class JsonValue extends JsonNode {
  public readonly type: string = 'value';

  public value: unknown;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    value = null,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    value?: unknown;
  } = {}) {
    super({ children, position, isMissing });
    this.value = value;
  }
}

export default JsonValue;
