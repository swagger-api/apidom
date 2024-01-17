import { mergeRight } from 'ramda';

import Node from '../../Node';
import type { NodeOptions } from '../../Node';

interface YamlDirectiveParameters {
  version: string | null;
  handle: string | null;
  prefix: string | null;
}

export interface YamlDirectiveOptions extends NodeOptions {
  name?: string | null;
  parameters?: YamlDirectiveParameters | object;
}

class YamlDirective extends Node {
  public readonly type: string = 'directive';

  public name: string | null;

  public parameters: YamlDirectiveParameters | null;

  constructor({ name = null, parameters = {}, ...rest }: YamlDirectiveOptions = {}) {
    super({ ...rest });
    this.name = name;
    this.parameters = mergeRight(
      {
        version: null,
        handle: null,
        prefix: null,
      },
      parameters,
    );
  }
}

export default YamlDirective;
