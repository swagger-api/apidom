import YamlNode from './YamlNode';
import type { YamlNodeOptions } from './YamlNode';

export interface YamlCollectionOptions extends YamlNodeOptions {}

class YamlCollection extends YamlNode {}

export default YamlCollection;
