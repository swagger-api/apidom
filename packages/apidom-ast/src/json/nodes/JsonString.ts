import JsonNode from './JsonNode';
import JsonStringContent from './JsonStringContent';
import JsonEscapeSequence from './JsonEscapeSequence';
import { isEscapeSequence, isStringContent } from './predicates';

type JsonStringLike = JsonStringContent | JsonEscapeSequence;

class JsonString extends JsonNode {
  public static readonly type: string = 'string';

  public get value() {
    if (this.children.length === 1) {
      const onlyChild = this.children[0] as JsonStringLike;
      return onlyChild.value;
    }

    return this.children
      .filter(
        (node: unknown): node is JsonStringLike => isStringContent(node) || isEscapeSequence(node),
      )
      .reduce((acc: string, cur): string => acc + cur.value, '');
  }
}

export default JsonString;
