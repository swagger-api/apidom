import JsonValue from './JsonValue.ts';

/**
 * @public
 */
class JsonEscapeSequence extends JsonValue {
  public static readonly type = 'escapeSequence';
}

export default JsonEscapeSequence;
