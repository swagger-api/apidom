import Tag from '../Tag';

class Null extends Tag {
  public static uri: string = 'tag:yaml.org,2002:null';

  constructor() {
    super();
    this.tag = Null.uri;
  }

  public static test(node: any): boolean {
    return /^null$/.test(node.content);
  }

  public static resolve(node: any): any {
    const nodeClone = node.clone();

    nodeClone.content = null;

    return nodeClone;
  }
}

export default Null;
