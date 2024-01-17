import Node from '../../Node';
import Position from '../../Position';
import YamlTag from './YamlTag';
import YamlAnchor from './YamlAnchor';
import { YamlStyle, YamlStyleGroup } from './YamlStyle';

class YamlNode extends Node {
  public anchor: YamlAnchor | null;

  public tag: YamlTag | null;

  public style: YamlStyle | null;

  public styleGroup: YamlStyleGroup | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    anchor = null,
    tag = null,
    style = null,
    styleGroup = null,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    anchor?: YamlAnchor | null;
    tag?: YamlTag | null;
    style?: YamlStyle | null;
    styleGroup?: YamlStyleGroup | null;
  } = {}) {
    super({ children, position, isMissing });
    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  }
}

export default YamlNode;
