import YamlAlias from '../nodes/YamlAlias';
import YamlAnchor from '../nodes/YamlAnchor';
import YamlScalar from '../nodes/YamlScalar';
import { YamlStyle, YamlStyleGroup } from '../nodes/YamlStyle';

class ReferenceManager {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  addAnchor(anchor: YamlAnchor): void {}

  // eslint-disable-next-line class-methods-use-this
  resolveAlias(alias: YamlAlias): YamlScalar {
    return new YamlScalar({
      content: alias.content,
      style: YamlStyle.Plain,
      styleGroup: YamlStyleGroup.Flow,
    });
  }
}

export default ReferenceManager;
