import JsonValue from './JsonValue.ts';

/**
 * @public
 */
class JsonNull extends JsonValue {
  public static readonly type = 'null';
}

export default JsonNull;
