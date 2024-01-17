import Node from '../../Node';
import Position from '../../Position';

export enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
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
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    explicitName?: string;
    kind?: YamlNodeKind | null;
  } = {}) {
    super({ children, position, isMissing });
    this.explicitName = explicitName;
    this.kind = kind;
  }
}

export default YamlTag;
