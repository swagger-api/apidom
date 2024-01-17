import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

class GenericMapping extends Tag {
  public static uri: string = 'tag:yaml.org,2002:map';

  constructor() {
    super();
    this.tag = GenericMapping.uri;
  }

  public static test(node: any): boolean {
    return node.tag.kind === YamlNodeKind.Mapping;
  }

  public static resolve(node: any): any {
    return node;
  }
}

export default GenericMapping;
