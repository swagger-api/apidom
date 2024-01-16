import FailsafeSchema from '../failsafe/index';
import Boolean from './Boolean';
import FloatingPoint from './FloatingPoint';
import Integer from './Integer';
import Null from './Null';
import { YamlNodeKind } from '../../nodes/YamlTag';
import GenericSequence from '../failsafe/GenericSequence';
import GenericMapping from '../failsafe/GenericMapping';

class JsonSchema extends FailsafeSchema {
  constructor() {
    super();
    /**
     * We're registering more specific tags before more generic ones from Failsafe schema.
     */
    this.registerTag(new Boolean(), true);
    this.registerTag(new FloatingPoint(), true);
    this.registerTag(new Integer(), true);
    this.registerTag(new Null(), true);
  }

  public static toSpecificTagName(node: any): any {
    // @ts-ignore
    let specificTagName = FailsafeSchema.compose.methods.toSpecificTagName.call(this, node);

    if (specificTagName === '?') {
      if (node.tag.vkind === YamlNodeKind.Sequence) {
        specificTagName = GenericSequence.uri;
      } else if (node.tag.kind === YamlNodeKind.Mapping) {
        specificTagName = GenericMapping.uri;
      } else if (node.tag.kind === YamlNodeKind.Scalar) {
        // @ts-ignore
        const foundTag = this.tags.find((tag) => tag.test(node));
        specificTagName = foundTag?.tag || '?';
      }
    }

    return specificTagName;
  }
}

export default JsonSchema;
