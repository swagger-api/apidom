import stampit from 'stampit';
import { isArray } from 'ramda-adjunct';

import Node from '../../Node';
import YamlDocument from './YamlDocument';
import { isDocument } from './predicates';

interface YamlStream extends Node {
  type: 'stream';
  readonly content: Array<YamlDocument>;
  children: Array<YamlDocument>;
}

const YamlStream: stampit.Stamp<YamlStream> = stampit(Node, {
  statics: {
    type: 'stream',
  },
  methods: {
    get content(): Array<YamlDocument> {
      return isArray(this.children) ? this.children.filter(isDocument) : [];
    },
  },
});

export default YamlStream;
