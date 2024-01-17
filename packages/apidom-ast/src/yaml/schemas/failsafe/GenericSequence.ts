import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

/* eslint-disable class-methods-use-this */
class GenericSequence extends Tag {
  public static readonly uri: string = 'tag:yaml.org,2002:seq';

  public test(node: any): boolean {
    return node.tag.kind === YamlNodeKind.Sequence;
  }
}
/* eslint-enable class-methods-use-this */

export default GenericSequence;
