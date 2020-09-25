import stampit from 'stampit';

import Node from '../../Node';

interface YamlComment extends Node {
  type: 'comment';
  content: string | null;
}

const YamlComment: stampit.Stamp<YamlComment> = stampit(Node, {
  statics: {
    type: 'comment',
  },
  props: {
    content: null,
  },
  init({ content = null } = {}) {
    this.content = content;
  },
});

export default YamlComment;
