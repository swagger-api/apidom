import { mergeRight } from 'ramda';

import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';

interface YamlDirectiveParameters {
  readonly version?: string;
  readonly handle?: string;
  readonly prefix?: string;
}

export interface YamlDirectiveOptions extends NodeOptions {
  readonly name?: string;
  readonly parameters: YamlDirectiveParameters;
}

class YamlDirective extends Node {
  public static readonly type = 'directive';

  public readonly name?: string;

  public readonly parameters: YamlDirectiveParameters;

  constructor({ name, parameters, ...rest }: YamlDirectiveOptions) {
    super({ ...rest });
    this.name = name;
    this.parameters = mergeRight(
      {
        version: undefined,
        handle: undefined,
        prefix: undefined,
      },
      parameters,
    );
  }
}

export default YamlDirective;
