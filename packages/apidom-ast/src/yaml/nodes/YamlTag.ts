import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
}

export interface YamlTagOptions extends NodeOptions {
  explicitName?: string;
  kind?: YamlNodeKind | null;
}

class YamlTag extends Node {
  public static readonly type: string = 'tag';

  public explicitName: string;

  public kind: YamlNodeKind | null;

  constructor({ explicitName = '', kind = null, ...rest }: YamlTagOptions = {}) {
    super({ ...rest });
    this.explicitName = explicitName;
    this.kind = kind;
  }
}

export default YamlTag;
