import stampit from 'stampit';

import Node from '../../Node';

enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
}

interface YamlTag {
  type: 'tag';
  name: string | null;
  kind: YamlNodeKind | null;
}

const YamlTag: stampit.Stamp<YamlTag> = stampit(Node, {
  statics: {
    type: 'tag',
  },
  props: {
    name: null,
    kind: null,
  },
  init({ name = null, kind = null } = {}) {
    this.name = name;
    this.kind = kind;
  },
});

export default YamlTag;
