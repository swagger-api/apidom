import stampit from 'stampit';
import { either } from 'ramda';

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
      return (
        this.children
          // @ts-ignore
          .filter(either(isStringContent, isEscapeSequence))
          .reduce(
            (acc: string, cur: JsonStringContent | JsonEscapeSequence): string => acc + cur.value,
            '',
          )
      );
    },
  },
});

export default JsonString;
