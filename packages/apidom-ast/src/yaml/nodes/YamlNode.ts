import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';
import YamlTag from './YamlTag.ts';
import YamlAnchor from './YamlAnchor.ts';
import { YamlStyle, YamlStyleGroup } from './YamlStyle.ts';

export interface YamlNodeOptions extends NodeOptions {
  readonly anchor?: YamlAnchor;
  readonly tag?: YamlTag;
  readonly style: YamlStyle;
  readonly styleGroup: YamlStyleGroup;
}

class YamlNode extends Node {
  public readonly anchor?: YamlAnchor;

  public readonly tag?: YamlTag;

  public readonly style: YamlStyle;

  public readonly styleGroup: YamlStyleGroup;

  constructor({ anchor, tag, style, styleGroup, ...rest }: YamlNodeOptions) {
    super({ ...rest });
    this.anchor = anchor;
    this.tag = tag;
    this.style = style;
    this.styleGroup = styleGroup;
  }
}

export default YamlNode;
