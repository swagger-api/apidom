import FailsafeSchema from '../failsafe/index.ts';
import BooleanTag from './Boolean.ts';
import FloatingPointTag from './FloatingPoint.ts';
import IntegerTag from './Integer.ts';
import NullTag from './Null.ts';
import { YamlNodeKind } from '../../nodes/YamlTag.ts';
import GenericSequence from '../failsafe/GenericSequence.ts';
import GenericMapping from '../failsafe/GenericMapping.ts';

class JsonSchema extends FailsafeSchema {
  constructor() {
    super();
    /**
     * We're registering more specific tags before more generic ones from Failsafe schema.
     */
    this.registerTag(new BooleanTag(), true);
    this.registerTag(new FloatingPointTag(), true);
    this.registerTag(new IntegerTag(), true);
    this.registerTag(new NullTag(), true);
  }

  public toSpecificTagName(node: any): any {
    let specificTagName = super.toSpecificTagName(node);

    if (specificTagName === '?') {
      if (node.tag.vkind === YamlNodeKind.Sequence) {
        specificTagName = GenericSequence.uri;
      } else if (node.tag.kind === YamlNodeKind.Mapping) {
        specificTagName = GenericMapping.uri;
      } else if (node.tag.kind === YamlNodeKind.Scalar) {
        const foundTag = this.tags.find((tag) => tag.test(node));
        specificTagName = foundTag?.tag || '?';
      }
    }

    return specificTagName;
  }
}

export default JsonSchema;
