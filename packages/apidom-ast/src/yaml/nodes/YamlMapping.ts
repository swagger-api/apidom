import YamlCollection from './YamlCollection';
import { isKeyValuePair } from './predicates';
import YamlKeyValuePair from './YamlKeyValuePair';

class YamlMapping extends YamlCollection {
  public static readonly type: string = 'mapping';
}

Object.defineProperty(YamlMapping.prototype, 'content', {
  get(): Array<YamlKeyValuePair> {
    return Array.isArray(this.children) ? this.children.filter(isKeyValuePair) : [];
  },
  enumerable: true,
});

export default YamlMapping;
