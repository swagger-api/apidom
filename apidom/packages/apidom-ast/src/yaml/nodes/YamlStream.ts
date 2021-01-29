import stampit from 'stampit';
import { either } from 'ramda';
import { isArray } from 'ramda-adjunct';

import Node from '../../Node';
import YamlDocument from './YamlDocument';
import YamlComment from './YamlComment';
import { isComment, isDocument } from './predicates';

interface YamlStream extends Node {
  type: 'stream';
  readonly content: Array<YamlDocument | YamlComment>;
  children: Array<YamlDocument>;
}

const YamlStream: stampit.Stamp<YamlStream> = stampit(Node, {
  statics: {
    type: 'stream',
  },
  methods: {
    get content(): Array<YamlDocument | YamlComment> {
      return isArray(this.children) ? this.children.filter(either(isDocument, isComment)) : [];
    },
  },
});

export default YamlStream;
