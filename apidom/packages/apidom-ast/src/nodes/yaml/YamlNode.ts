import stampit from 'stampit';

import Node from '../../Node';
import YamlTag from './YamlTag';
import YamlAnchor from './YamlAnchor';
import { YamlStyle, YamlStyleGroup } from './YamlStyle';

interface YamlNode extends Node {
  content: unknown | null;
  anchor: YamlAnchor | null;
  tag: YamlTag | null;
  style: YamlStyle;
  styleGroup: YamlStyleGroup;
}

const YamlNode: stampit.Stamp<YamlNode> = stampit(Node, {
  props: {
    content: null,
    anchor: null,
    tag: null,
    style: null,
    styleGroup: null,
  },
  init({ content = null, anchor = null, tag = null, style = null, styleGroup = null } = {}) {
    this.content = content;
    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  },
});

export default YamlNode;
