import Node from '../../Node';
import type { NodeOptions } from '../../Node';
import YamlTag from './YamlTag';
import YamlAnchor from './YamlAnchor';
import { YamlStyle, YamlStyleGroup } from './YamlStyle';

export interface YamlNodeOptions extends NodeOptions {
  anchor?: YamlAnchor | null;
  tag?: YamlTag | null;
  style?: YamlStyle | null;
  styleGroup?: YamlStyleGroup | null;
}

class YamlNode extends Node {
  public anchor: YamlAnchor | null;

  public tag: YamlTag | null;

  public style: YamlStyle | null;

  public styleGroup: YamlStyleGroup | null;

  constructor({
    anchor = null,
    tag = null,
    style = null,
    styleGroup = null,
    ...rest
  }: YamlNodeOptions = {}) {
    super({ ...rest });
    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  }
}

export default YamlNode;
