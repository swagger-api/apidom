import Tag from '../Tag';

/* eslint-disable class-methods-use-this */
class Null extends Tag {
  public static readonly uri: string = 'tag:yaml.org,2002:null';

  public test(node: any): boolean {
    return /^null$/.test(node.content);
  }

  public resolve(node: any): any {
    const nodeClone = node.clone();

    nodeClone.content = null;

    return nodeClone;
  }
}
/* eslint-enable class-methods-use-this */

export default Null;
