import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';

/**
 * @public
 */
export enum YamlNodeKind {
  Scalar = 'Scalar',
  Sequence = 'Sequence',
  Mapping = 'Mapping',
}

/**
 * @public
 */
export interface YamlTagOptions extends NodeOptions {
  readonly explicitName: string;
  readonly kind: YamlNodeKind;
}

/**
 * @public
 */
class YamlTag extends Node {
  public static readonly type = 'tag';

  public readonly explicitName: string;

  public readonly kind: YamlNodeKind;

  constructor({ explicitName, kind, ...rest }: YamlTagOptions) {
    super({ ...rest });
    this.explicitName = explicitName;
    this.kind = kind;
  }
}

export default YamlTag;
