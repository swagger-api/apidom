import stampit from 'stampit';

import Node from '../../Node';

interface YamlDocument extends Node {
  type: 'document';
}

const YamlDocument: stampit.Stamp<YamlDocument> = stampit(Node, {
  statics: {
    type: 'document',
  },
});

export default YamlDocument;
