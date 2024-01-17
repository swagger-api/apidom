import YamlCollection from './YamlCollection';
import YamlMapping from './YamlMapping';
import YamlScalar from './YamlScalar';
import YamlAlias from './YamlAlias';
import { isMapping, isScalar, isSequence, isAlias } from './predicates';

class YamlSequence extends YamlCollection {
  public static readonly type: string = 'sequence';
}

Object.defineProperty(YamlSequence.prototype, 'content', {
  get(): Array<YamlSequence | YamlMapping | YamlScalar | YamlAlias> {
    const { children } = this;

    return Array.isArray(children)
      ? children.filter(
          (node: unknown) => isSequence(node) || isMapping(node) || isScalar(node) || isAlias(node),
        )
      : [];
  },
  enumerable: true,
});

export default YamlSequence;
