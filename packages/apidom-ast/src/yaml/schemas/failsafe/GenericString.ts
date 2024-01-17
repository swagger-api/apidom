import Tag from '../Tag';

class GenericString extends Tag {
  public static uri: string = 'tag:yaml.org,2002:str';

  constructor() {
    super();
    this.tag = GenericString.uri;
  }

  public static resolve(node: any): any {
    return node;
  }
}

export default GenericString;
