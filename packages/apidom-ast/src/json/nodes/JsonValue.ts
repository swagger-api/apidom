import { NodeConstructor } from '../../Node';
import JsonNode from './JsonNode';

interface JsonValueConstructor extends NodeConstructor {
  value?: unknown;
}

class JsonValue extends JsonNode {
  public readonly type: string = 'value';

  public value: unknown;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    value = null,
  }: JsonValueConstructor = {}) {
    super({ children, position, isMissing });
    this.value = value;
  }
}

export default JsonValue;
