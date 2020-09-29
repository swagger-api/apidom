import stampit from 'stampit';

import Node from '../../Node';

interface YamlKeyValuePair extends Node {
  type: 'keyValuePair';
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(Node, {
  statics: {
    type: 'keyValuePair',
  },
});

export default YamlKeyValuePair;
