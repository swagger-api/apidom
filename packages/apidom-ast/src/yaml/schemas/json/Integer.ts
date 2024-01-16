import Tag from '../Tag';

class Integer extends Tag {
  public static uri: string = 'tag:yaml.org,2002:int';

  constructor() {
    super();
    this.tag = Integer.uri;
  }

  public static test(node: any): boolean {
    return /^-?(0|[1-9][0-9]*)$/.test(node.content);
  }

  public static resolve(node: any): any {
    const content = parseInt(node.content, 10);
    const nodeClone = node.clone();

    nodeClone.content = content;

    return nodeClone;
  }
}

export default Integer;
