import { head } from 'ramda';

import JsonNode from './JsonNode';

class JsonDocument extends JsonNode {
  public static readonly type: string = 'document';

  public get child(): unknown {
    return head(this.children);
  }
}

export default JsonDocument;
