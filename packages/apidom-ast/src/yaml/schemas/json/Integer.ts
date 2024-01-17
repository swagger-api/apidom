import Tag from '../Tag';

/* eslint-disable class-methods-use-this */
class Integer extends Tag {
  public static readonly uri: string = 'tag:yaml.org,2002:int';

  public test(node: any): boolean {
    return /^-?(0|[1-9][0-9]*)$/.test(node.content);
  }

  public resolve(node: any): any {
    const content = parseInt(node.content, 10);
    const nodeClone = node.clone();

    nodeClone.content = content;

    return nodeClone;
  }
}
/* eslint-enable class-methods-use-this */

export default Integer;
