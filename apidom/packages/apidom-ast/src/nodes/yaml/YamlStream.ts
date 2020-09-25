import stampit from 'stampit';

import Node from '../../Node';
import YamlDocument from './YamlDocument';

interface YamlStream extends Node {
  type: 'stream';
  children: Array<YamlDocument>;
}

const YamlStream: stampit.Stamp<YamlStream> = stampit(Node, {
  statics: {
    type: 'stream',
  },
});

export default YamlStream;
