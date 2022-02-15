import stampit from 'stampit';

import FailsafeSchema from '../failsafe/index';
import Boolean from './Boolean';
import FloatingPoint from './FloatingPoint';
import Integer from './Integer';
import Null from './Null';
import { YamlNodeKind } from '../../nodes/YamlTag';
import GenericSequence from '../failsafe/GenericSequence';
import GenericMapping from '../failsafe/GenericMapping';

const JsonSchema = stampit(FailsafeSchema, {
  init() {
    /**
     * We're registering more specific tags before more generic ones from Failsafe schema.
     */
    this.registerTag(Boolean(), true);
    this.registerTag(FloatingPoint(), true);
    this.registerTag(Integer(), true);
    this.registerTag(Null(), true);
  },
  methods: {
    toSpecificTagName(node) {
      // @ts-ignore
      let specificTagName = FailsafeSchema.compose.methods.toSpecificTagName.call(this, node);

      if (specificTagName === '?') {
        if (node.tag.vkind === YamlNodeKind.Sequence) {
          // @ts-ignore
          specificTagName = GenericSequence.uri;
        } else if (node.tag.kind === YamlNodeKind.Mapping) {
          // @ts-ignore
          specificTagName = GenericMapping.uri;
        } else if (node.tag.kind === YamlNodeKind.Scalar) {
          // @ts-ignore
          const foundTag = this.tags.find((tag) => tag.test(node));
          specificTagName = foundTag?.tag || '?';
        }
      }

      return specificTagName;
    },
  },
});

export default JsonSchema;
