import YamlAlias from '../nodes/YamlAlias';
import YamlNode from '../nodes/YamlNode';
import YamlScalar from '../nodes/YamlScalar';
import YamlReferenceError from '../errors/YamlReferenceError';
import { isAnchor } from '../nodes/predicates';
import { YamlStyle, YamlStyleGroup } from '../nodes/YamlStyle';

/* eslint-disable class-methods-use-this */
class ReferenceManager {
  addAnchor(node: YamlNode): void {
    if (!isAnchor(node.anchor)) {
      throw new YamlReferenceError('Expected YAML anchor to be attached the the YAML AST node.', {
        node,
      });
    }
  }

  resolveAlias(alias: YamlAlias): YamlScalar {
    return new YamlScalar({
      content: alias.content,
      style: YamlStyle.Plain,
      styleGroup: YamlStyleGroup.Flow,
    });
  }
}
/* eslint-enable class-methods-use-this */

export default ReferenceManager;
