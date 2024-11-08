import {
  formatFlowPlain,
  formatFlowSingleQuoted,
  formatFlowDoubleQuoted,
  formatBlockLiteral,
  formatBlockFolded,
} from './canonical-format.ts';
import { YamlStyle } from '../nodes/YamlStyle.ts';
import { YamlNodeKind } from '../nodes/YamlTag.ts';

class ScalarTag {
  public static test(node: any): boolean {
    return node.tag.kind === YamlNodeKind.Scalar && typeof node.content === 'string';
  }

  public static canonicalFormat(node: any): any {
    let canonicalForm = node.content;
    const nodeClone = node.clone();

    if (node.style === YamlStyle.Plain) {
      canonicalForm = formatFlowPlain(node.content);
    } else if (node.style === YamlStyle.SingleQuoted) {
      canonicalForm = formatFlowSingleQuoted(node.content);
    } else if (node.style === YamlStyle.DoubleQuoted) {
      canonicalForm = formatFlowDoubleQuoted(node.content);
    } else if (node.style === YamlStyle.Literal) {
      canonicalForm = formatBlockLiteral(node.content);
    } else if (node.style === YamlStyle.Folded) {
      canonicalForm = formatBlockFolded(node.content);
    }

    nodeClone.content = canonicalForm;

    return nodeClone;
  }

  public static resolve(node: any): any {
    return node;
  }
}

export default ScalarTag;
