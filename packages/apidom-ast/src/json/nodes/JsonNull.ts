import JsonValue from './JsonValue.ts';

class JsonNull extends JsonValue {
  public static readonly type = 'null';
}

export default JsonNull;
