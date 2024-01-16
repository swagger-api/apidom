import Node, { NodeConstructor } from '../../Node';

export enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
}

interface YamlTagConstructor extends NodeConstructor {
  explicitName?: string;
  kind?: YamlNodeKind | null;
}

class YamlTag extends Node {
  public readonly type: string = 'tag';

  public explicitName: string;

  public kind: YamlNodeKind | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    explicitName = '',
    kind = null,
  }: YamlTagConstructor = {}) {
    super({ children, position, isMissing });
    this.explicitName = explicitName;
    this.kind = kind;
  }
}

export default YamlTag;
