import { clone } from 'ramda';

import YamlTagError from '../../errors/YamlTagError';
import YamlDirective from '../../nodes/YamlDirective';
import { YamlNodeKind } from '../../nodes/YamlTag';
import GenericMappingTag from './GenericMapping';
import GenericSequenceTag from './GenericSequence';
import GenericStringTag from './GenericString';
import ScalarTag from '../ScalarTag';

class FailsafeSchema {
  public tags: any[];

  public tagDirectives: YamlDirective[];

  constructor() {
    this.tags = [];
    this.tagDirectives = [];
    this.registerTag(new GenericMappingTag());
    this.registerTag(new GenericSequenceTag());
    this.registerTag(new GenericStringTag());
  }

  // eslint-disable-next-line class-methods-use-this
  public toSpecificTagName(node: any): string {
    let specificTagName = node.tag.explicitName;

    if (node.tag.explicitName === '!') {
      // non-specific tag; we assume tag by kind
      if (node.tag.kind === YamlNodeKind.Scalar) {
        specificTagName = GenericStringTag.uri;
      } else if (node.tag.kind === YamlNodeKind.Sequence) {
        specificTagName = GenericSequenceTag.uri;
      } else if (node.tag.kind === YamlNodeKind.Mapping) {
        specificTagName = GenericMappingTag.uri;
      }
    } else if (node.tag.explicitName.startsWith('!<')) {
      // verbatim form
      specificTagName = node.tag.explicitName.replace(/^!</, '').replace(/>$/, '');
    } else if (node.tag.explicitName.startsWith('!!')) {
      // shorthand notation
      specificTagName = `tag:yaml.org,2002:${node.tag.explicitName.replace(/^!!/, '')}`;
    }

    return specificTagName;
  }

  public registerTagDirective(tagDirective: YamlDirective): void {
    this.tagDirectives.push({
      // @ts-ignore
      handle: tagDirective.parameters.handle,
      // @ts-ignore
      prefix: tagDirective.parameters.prefix,
    });
  }

  public registerTag(tag: any, beginning = false): this {
    if (beginning) {
      this.tags.unshift(tag);
    } else {
      this.tags.push(tag);
    }

    return this;
  }

  public overrideTag(tag: any): this {
    this.tags = this.tags.filter((itag: any) => itag.tag === tag.tag);
    this.tags.push(tag);
    return this;
  }

  public resolve(node: any): any {
    const specificTagName = this.toSpecificTagName(node);

    // leave this node unresolved
    if (specificTagName === '?') {
      return node;
    }

    // turn scalar nodes into canonical format before resolving
    let canonicalNode = node;
    if (ScalarTag.test(node)) {
      canonicalNode = ScalarTag.canonicalFormat(node);
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
  }
}

export default FailsafeSchema;
