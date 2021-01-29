import stampit from 'stampit';

import Node from '../../Node';

interface YamlAlias extends Node {
  type: 'alias';
  content: string | null;
}

const YamlAlias: stampit.Stamp<YamlAlias> = stampit(Node, {
  statics: {
    type: 'alias',
  },
  props: {
    content: null,
  },
  init({ content = null } = {}) {
    this.content = content;
  },
});

export default YamlAlias;
