import stampit from 'stampit';

import Node from '../../Node';

interface YamlAnchor extends Node {
  type: 'anchor';
  name: string | null;
}

const YamlAnchor: stampit.Stamp<YamlAnchor> = stampit(Node, {
  statics: {
    type: 'anchor',
  },
  props: {
    name: null,
  },
  init({ name = null } = {}) {
    this.name = name;
  },
});

export default YamlAnchor;
