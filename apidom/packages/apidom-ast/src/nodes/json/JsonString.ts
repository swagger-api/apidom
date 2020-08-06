import stampit from 'stampit';
import { either } from 'ramda';

import Node from '../../Node';
import JsonStringContent from './JsonStringContent';
import JsonEscapeSequence from './JsonEscapeSequence';
import { isEscapeSequence, isStringContent } from './predicates';

interface JsonString extends Node {
  value: string;
}

const JsonString: stampit.Stamp<JsonString> = stampit(Node, {
  statics: {
    type: 'string',
  },
  methods: {
    get value(): string {
      return (
        this.children
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
