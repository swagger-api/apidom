import JsonNode from './JsonNode.ts';
import JsonStringContent from './JsonStringContent.ts';
import JsonEscapeSequence from './JsonEscapeSequence.ts';
import { isEscapeSequence, isStringContent } from './predicates.ts';

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
