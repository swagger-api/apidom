import JsonValue from './JsonValue';

class JsonNull extends JsonValue {
  public readonly type: string = 'null';
}

export default JsonNull;
