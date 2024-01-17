import Tag from '../Tag';

/* eslint-disable class-methods-use-this */
class FloatingPoint extends Tag {
  public static readonly uri: string = 'tag:yaml.org,2002:float';

  public test(node: any): boolean {
    return /^-?(0|[1-9][0-9]*)(\.[0-9]*)?([eE][-+]?[0-9]+)?$/.test(node.content);
  }

  public resolve(node: any): any {
    const content = parseFloat(node.content);
    const nodeClone = node.clone();

    nodeClone.content = content;

    return nodeClone;
  }
}
/* eslint-enable class-methods-use-this */

export default FloatingPoint;
