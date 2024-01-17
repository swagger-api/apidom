import { head } from 'ramda';

import Node from './Node';

class ParseResult extends Node {
  public static readonly type: string = 'parseResult';

  public get rootNode(): unknown {
    return head(this.children);
  }
}

export default ParseResult;
