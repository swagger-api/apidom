import stampit from 'stampit';

import Node from '../../Node';
import YamlTag from './YamlTag';
import YamlAnchor from './YamlAnchor';
import { YamlStyle, YamlStyleGroup } from './YamlStyle';

interface YamlNode extends Node {
  anchor: YamlAnchor | null;
  tag: YamlTag | null;
  style: YamlStyle;
  styleGroup: YamlStyleGroup;
}

const YamlNode: stampit.Stamp<YamlNode> = stampit(Node, {
  props: {
    anchor: null,
    tag: null,
    style: null,
    styleGroup: null,
  },
  init({ anchor = null, tag = null, style = null, styleGroup = null } = {}) {
    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  },
});

export default YamlNode;
