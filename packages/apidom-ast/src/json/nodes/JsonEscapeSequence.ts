import JsonValue from './JsonValue.ts';

class JsonEscapeSequence extends JsonValue {
  public static readonly type = 'escapeSequence';
}

export default JsonEscapeSequence;
