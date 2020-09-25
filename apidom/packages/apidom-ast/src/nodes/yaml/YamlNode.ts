import stampit from 'stampit';

import Node from '../../Node';

interface YamlNode extends Node {
  content: unknown | null;
  anchor: unknown | null;
  tag: unknown | null;
}

const YamlNode: stampit.Stamp<YamlNode> = stampit(Node, {
  props: {
    content: null,
    anchor: null,
    tag: null,
  },
  init({ content = null, anchor = null, tag = null } = {}) {
    this.content = content;
    this.anchor = anchor;
    this.tag = tag;
  },
});

export default YamlNode;
