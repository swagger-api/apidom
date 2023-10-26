import { clone } from 'ramda';
import stampit from 'stampit';

import YamlTagError from '../../errors/YamlTagError';
import YamlDirective from '../../nodes/YamlDirective';
import { YamlNodeKind } from '../../nodes/YamlTag';
import GenericMapping from './GenericMapping';
import GenericSequence from './GenericSequence';
import GenericString from './GenericString';
import ScalarTag from '../ScalarTag';

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
    toSpecificTagName(node) {
      let specificTagName = node.tag.explicitName;

      if (node.tag.explicitName === '!') {
        // non-specific tag; we assume tag by kind
        if (node.tag.kind === YamlNodeKind.Scalar) {
          // @ts-ignore
          specificTagName = GenericString.uri;
        } else if (node.tag.kind === YamlNodeKind.Sequence) {
          // @ts-ignore
          specificTagName = GenericSequence.uri;
        } else if (node.tag.kind === YamlNodeKind.Mapping) {
          // @ts-ignore
          specificTagName = GenericMapping.uri;
        }
      } else if (node.tag.explicitName.startsWith('!<')) {
        // verbatim form
        specificTagName = node.tag.explicitName.replace(/^!</, '').replace(/>$/, '');
      } else if (node.tag.explicitName.startsWith('!!')) {
        // shorthand notation
        specificTagName = `tag:yaml.org,2002:${node.tag.explicitName.replace(/^!!/, '')}`;
      }

      return specificTagName;
    },

    registerTagDirective(tagDirective: YamlDirective) {
      this.tagDirectives.push({
        handle: tagDirective.parameters.handle,
        prefix: tagDirective.parameters.prefix,
      });
    },

    registerTag(tag, beginning = false) {
      if (beginning) {
        this.tags.unshift(tag);
      } else {
        this.tags.push(tag);
      }

      return this;
    },

    overrideTag(tag) {
      this.tags = this.tags.filter((itag: any) => itag.tag === tag.tag);
      this.tags.push(tag);
      return this;
    },

    resolve(node) {
      const specificTagName = this.toSpecificTagName(node);

      // leave this node unresolved
      if (specificTagName === '?') {
        return node;
      }

      // turn scalar nodes into canonical format before resolving
      let canonicalNode = node;
      if (node.tag.kind === YamlNodeKind.Scalar) {
        canonicalNode = ScalarTag().canonicalFormat(node);
      }

      const tag = this.tags.find((itag: any) => itag?.tag === specificTagName);

      // mechanism for resolving node (tag implementation) not found
      if (typeof tag === 'undefined') {
        throw new YamlTagError(`Tag "${specificTagName}" was not recognized.`, {
          specificTagName,
          explicitTagName: node.tag.explicitName,
          tagKind: node.tag.kind,
          tagPosition: clone(node.tag.position),
          node: node.clone(),
        });
      }

      // node content is not compatible with resolving mechanism (tag implementation)
      if (!tag.test(canonicalNode)) {
        throw new YamlTagError(`Node couldn't be resolved against the tag "${specificTagName}"`, {
          specificTagName,
          explicitTagName: node.tag.explicitName,
          tagKind: node.tag.kind,
          tagPosition: clone(node.tag.position),
          nodeCanonicalContent: canonicalNode.content,
          node: node.clone(),
        });
      }

      return tag.resolve(canonicalNode);
    },
  },
});

export default FailsafeSchema;
