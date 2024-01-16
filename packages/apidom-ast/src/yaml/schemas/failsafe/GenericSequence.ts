import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

class GenericSequence extends Tag {
  public static uri: string = 'tag:yaml.org,2002:seq';

  constructor() {
    super();
    this.tag = GenericSequence.uri;
  }

  public static test(node: any): boolean {
    return node.tag.kind === YamlNodeKind.Sequence;
  }

  public static resolve(node: any): any {
    return node;
  }
}

export default GenericSequence;
