import JsonNode from './JsonNode';
import JsonStringContent from './JsonStringContent';
import JsonEscapeSequence from './JsonEscapeSequence';
import { isEscapeSequence, isStringContent } from './predicates';

class JsonString extends JsonNode {
  public static readonly type: string = 'string';

  public get value(): string {
    if (this.children.length === 1) {
      // @ts-ignore
      return this.children[0].value;
    }

    // @ts-ignore
    return this.children
      .filter((node: unknown) => isStringContent(node) || isEscapeSequence(node))
      .reduce(
        // @ts-ignore
        (acc: string, cur: JsonStringContent | JsonEscapeSequence): string => acc + cur.value,
        '',
      );
  }
}

export default JsonString;
