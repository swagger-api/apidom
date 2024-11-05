import { head } from 'ramda';

import JsonNode from './JsonNode.ts';

class JsonDocument extends JsonNode {
  public static readonly type = 'document';

  public get child(): unknown {
    return head(this.children);
  }
}

export default JsonDocument;
