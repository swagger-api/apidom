import YamlCollection from './YamlCollection.ts';
import YamlMapping from './YamlMapping.ts';
import YamlScalar from './YamlScalar.ts';
import YamlAlias from './YamlAlias.ts';
import { isMapping, isScalar, isSequence, isAlias } from './predicates.ts';

class YamlSequence extends YamlCollection {
  public static readonly type = 'sequence';
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
