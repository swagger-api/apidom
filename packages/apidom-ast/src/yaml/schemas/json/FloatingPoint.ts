import Tag from '../Tag';

class FloatingPoint extends Tag {
  public static uri: string = 'tag:yaml.org,2002:float';

  constructor() {
    super();
    this.tag = FloatingPoint.uri;
  }

  public static test(node: any): boolean {
    return /^-?(0|[1-9][0-9]*)(\.[0-9]*)?([eE][-+]?[0-9]+)?$/.test(node.content);
  }

  public static resolve(node: any): any {
    const content = parseFloat(node.content);
    const nodeClone = node.clone();

    nodeClone.content = content;

    return nodeClone;
  }
}

export default FloatingPoint;
