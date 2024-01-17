import Node from '../../Node';
import type { NodeOptions } from '../../Node';
import YamlScalar from './YamlScalar';
import type { YamlStyleGroup } from './YamlStyle';
import { isScalar, isMapping, isSequence, isAlias } from './predicates';

export interface YamlKeyValuePairOptions extends NodeOptions {
  readonly styleGroup: YamlStyleGroup;
}

class YamlKeyValuePair extends Node {
  public static readonly type: string = 'keyValuePair';

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
