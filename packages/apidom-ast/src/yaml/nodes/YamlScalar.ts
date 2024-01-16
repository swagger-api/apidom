import YamlNode, { YamlNodeConstructor } from './YamlNode';

interface YamlScalarConstructor extends YamlNodeConstructor {
  content?: string | null;
}

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
  }: YamlScalarConstructor = {}) {
    super({ children, position, isMissing, anchor, tag, style, styleGroup });
    this.content = content;
  }
}

export default YamlScalar;
