import JsonValue from './JsonValue';

class JsonEscapeSequence extends JsonValue {
  public readonly type: string = 'escapeSequence';
}

export default JsonEscapeSequence;
