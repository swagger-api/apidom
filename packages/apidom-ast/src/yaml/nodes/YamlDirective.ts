import stampit from 'stampit';
import { mergeRight } from 'ramda';

import Node from '../../Node';

interface YamlDirectiveParameters {
  version: string | null;
  handle: string | null;
  prefix: string | null;
}

interface YamlDirective extends Node {
  type: 'directive';
  name: string | null;
  parameters: YamlDirectiveParameters;
}

const YamlDirective: stampit.Stamp<YamlDirective> = stampit(Node, {
  statics: {
    type: 'directive',
  },
  props: {
    name: null,
    parameters: null,
  },
  init({ name = null, parameters = {} } = {}) {
    this.name = name;
    this.parameters = mergeRight(
      {
        version: null,
        handle: null,
        prefix: null,
      },
      parameters,
    );
  },
});

export default YamlDirective;
