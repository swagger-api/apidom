import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

/* eslint-disable class-methods-use-this */
class GenericMapping extends Tag {
  public static readonly uri: string = 'tag:yaml.org,2002:map';

  public test(node: any): boolean {
    return node.tag.kind === YamlNodeKind.Mapping;
  }
}
/* eslint-enable class-methods-use-this */

export default GenericMapping;
