import stampit from 'stampit';
import { propEq, reject } from 'ramda';
import { isUndefined } from 'ramda-adjunct';

import YamlDirective from '../../nodes/YamlDirective';
import YamlTag, { YamlNodeKind } from '../../nodes/YamlTag';
import GenericMapping from './GenericMapping';
import GenericSequence from './GenericSequence';
import GenericString from './GenericString';

const FailsafeSchema = stampit({
  props: {
    tags: [],
    tagDirectives: [],
  },
  init() {
    this.tags = [];
    this.tagDirectives = [];
    this.registerTag(GenericMapping());
    this.registerTag(GenericSequence());
    this.registerTag(GenericString());
  },
  methods: {
    toSpecificTagName(tag: YamlTag) {
      let specificTagName = tag.explicitName;

      if (tag.explicitName === '!') {
        // non-specific tag; we assume tag by kind
        if (tag.kind === YamlNodeKind.Scalar) {
          // @ts-ignore
          specificTagName = GenericString.uri;
        } else if (tag.kind === YamlNodeKind.Sequence) {
          // @ts-ignore
          specificTagName = GenericSequence.uri;
        } else if (tag.kind === YamlNodeKind.Mapping) {
          // @ts-ignore
          specificTagName = GenericMapping.uri;
        }
      } else if (tag.explicitName.startsWith('!<')) {
        // verbatim form
        specificTagName = tag.explicitName.replace(/^!</, '').replace(/>$/, '');
      } else if (tag.explicitName.startsWith('!!')) {
        // shorthand notation
        specificTagName = `tag:yaml.org,2002:${tag.explicitName.replace(/^!!/, '')}`;
      }

      return specificTagName;
    },

    registerTagDirective(tagDirective: YamlDirective) {
      this.tagDirectives.push({
        handle: tagDirective.parameters.handle,
        prefix: tagDirective.parameters.prefix,
      });
    },

    registerTag(tag) {
      this.tags.push(tag);
      return this;
    },

    overrideTag(tag) {
      this.tags = reject(propEq('tag', tag.tag), this.tags);
      this.tags.push(tag);
      return this;
    },

    resolve(node) {
      const specificTagName = this.toSpecificTagName(node.tag);

      // we leave this node unresolved
      if (specificTagName === '?') {
        return node;
      }

      const tag = this.tags.find(propEq('tag', specificTagName));

      // mechanism for resolving node (tag implementation) not found
      if (isUndefined(tag)) {
        throw new Error(`Tag "${specificTagName}" couldn't be resolved`);
      }

      // node content is not compatible with resolving mechanism (tag implementation)
      if (!tag.test(node)) {
        throw new Error(`Node couldn't be resolved against tag "${specificTagName}"`);
      }

      return tag.resolve(node);
    },
  },
});

export default FailsafeSchema;
