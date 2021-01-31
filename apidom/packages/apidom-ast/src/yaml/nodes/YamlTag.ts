import stampit from 'stampit';

import Node from '../../Node';

export enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
}

interface YamlTag extends Node {
  type: 'tag';
  explicitName: string; // eslint-disable-line
  kind: YamlNodeKind;
}

const YamlTag: stampit.Stamp<YamlTag> = stampit(Node, {
  statics: {
    type: 'tag',
  },
  props: {
    explicitName: '',
    kind: null,
  },
  init(this: YamlTag, { explicitName, kind } = {}) {
    this.explicitName = explicitName;
    this.kind = kind;
  },
});

export default YamlTag;
