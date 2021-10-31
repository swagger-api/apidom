import stampit from 'stampit';

import JsonNode from './JsonNode';
import JsonStringContent from './JsonStringContent';
import JsonEscapeSequence from './JsonEscapeSequence';
import { isEscapeSequence, isStringContent } from './predicates';

interface JsonString extends JsonNode {
  value: string;
}

const JsonString: stampit.Stamp<JsonString> = stampit(JsonNode, {
  statics: {
    type: 'string',
  },
  methods: {
    get value(): string {
      // @ts-ignore
      if (this.children.length === 1) {
        // @ts-ignore
        return this.children[0].value;
      }

      return (
        this.children
          // @ts-ignore
          .filter((node: any) => isStringContent(node) || isEscapeSequence(node))
          .reduce(
            (acc: string, cur: JsonStringContent | JsonEscapeSequence): string => acc + cur.value,
            '',
          )
      );
    },
  },
});

export default JsonString;
