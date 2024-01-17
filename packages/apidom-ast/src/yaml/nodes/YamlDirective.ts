import { mergeRight } from 'ramda';

import Node from '../../Node';
import Position from '../../Position';

interface YamlDirectiveParameters {
  version: string | null;
  handle: string | null;
  prefix: string | null;
}

class YamlDirective extends Node {
  public readonly type: string = 'directive';

  public name: string | null;

  public parameters: YamlDirectiveParameters | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    name = null,
    parameters = {},
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    name?: string | null;
    parameters?: YamlDirectiveParameters | object;
  } = {}) {
    super({ children, position, isMissing });
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
