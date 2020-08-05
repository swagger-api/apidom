import stampit from 'stampit';
import { either, propEq } from 'ramda';

import JsonNode from './traits/JsonNode';
import NodeType from './node-type';
import JsonStringContent from './JsonStringContent';
import JsonEscapeSequence from './JsonEscapeSequence';

interface JsonString extends JsonNode {
  children: unknown[];
  value: string;
}

const JsonString: stampit.Stamp<JsonString> = stampit(JsonNode, {
  init({ children = [], position = null } = {}) {
    this.type = NodeType.String;
    this.children = children;
    this.position = position;
  },
  methods: {
    get value(): string {
      return (
        this.children
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .filter(
            either(propEq('type', NodeType.StringContent), propEq('type', NodeType.EscapeSequence)),
          )
          .reduce(
            (acc: string, cur: JsonStringContent | JsonEscapeSequence): string => acc + cur.value,
            '',
          )
      );
    },
  },
});

export default JsonString;
