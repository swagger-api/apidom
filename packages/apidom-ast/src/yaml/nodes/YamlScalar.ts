import YamlNode from './YamlNode';
import Position from '../../Position';
import YamlAnchor from './YamlAnchor';
import YamlTag from './YamlTag';
import { YamlStyle, YamlStyleGroup } from './YamlStyle';

class YamlScalar extends YamlNode {
  public readonly type: string = 'scalar';

  public readonly content: string | null;

  public format: string | null = null;

  public text: string | null = null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    anchor = null,
    tag = null,
    style = null,
    styleGroup = null,
    content = '',
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    anchor?: YamlAnchor | null;
    tag?: YamlTag | null;
    style?: YamlStyle | null;
    styleGroup?: YamlStyleGroup | null;
    content?: string | null;
  } = {}) {
    super({ children, position, isMissing, anchor, tag, style, styleGroup });
    this.content = content;
  }
}

export default YamlScalar;
