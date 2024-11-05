import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';
import YamlScalar from './YamlScalar.ts';
import type { YamlStyleGroup } from './YamlStyle.ts';
import { isScalar, isMapping, isSequence, isAlias } from './predicates.ts';

export interface YamlKeyValuePairOptions extends NodeOptions {
  readonly styleGroup: YamlStyleGroup;
}

class YamlKeyValuePair extends Node {
  public static readonly type = 'keyValuePair';

  public readonly styleGroup: YamlStyleGroup;

  constructor({ styleGroup, ...rest }: YamlKeyValuePairOptions) {
    super({ ...rest });
    this.styleGroup = styleGroup;
  }
}

Object.defineProperties(YamlKeyValuePair.prototype, {
  key: {
    get(): YamlScalar {
      return this.children.filter(
        (node: any) => isScalar(node) || isMapping(node) || isSequence(node),
      )[0];
    },
    enumerable: true,
  },
  value: {
    get(): any {
      const { key, children } = this;
      const excludeKeyPredicate = (node: any) => node !== key;
      const valuePredicate = (node: any) =>
        isScalar(node) || isMapping(node) || isSequence(node) || isAlias(node);

      return children.filter((node: any) => excludeKeyPredicate(node) && valuePredicate(node))[0];
    },
    enumerable: true,
  },
});

export default YamlKeyValuePair;
