import Tag from '../Tag';

class Boolean extends Tag {
  public static uri: string = 'tag:yaml.org,2002:bool';

  constructor() {
    super();
    this.tag = Boolean.uri;
  }

  public static test(node: any): boolean {
    return /^(true|false)$/.test(node.content);
  }

  public static resolve(node: any): any {
    const content = node.content === 'true';
    const nodeClone = node.clone();

    nodeClone.content = content;

    return nodeClone;
  }
}

export default Boolean;
