import { mergeRight } from 'ramda';

import Node, { NodeConstructor } from '../../Node';

interface YamlDirectiveParameters {
  version: string | null;
  handle: string | null;
  prefix: string | null;
}

interface YamlDirectiveConstructor extends NodeConstructor {
  name?: string | null;
  parameters?: YamlDirectiveParameters | object;
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
  }: YamlDirectiveConstructor = {}) {
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
