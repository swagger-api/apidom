import Node, { NodeConstructor } from '../../Node';
import YamlScalar from './YamlScalar';
import type { YamlStyleGroup } from './YamlStyle';
import { isScalar, isMapping, isSequence, isAlias } from './predicates';

interface YamlKeyValuePairConstructor extends NodeConstructor {
  styleGroup?: YamlStyleGroup | null;
}

class YamlKeyValuePair extends Node {
  public readonly type: string = 'keyValuePair';

  public styleGroup: YamlStyleGroup | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    styleGroup = null,
  }: YamlKeyValuePairConstructor = {}) {
    super({ children, position, isMissing });
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
