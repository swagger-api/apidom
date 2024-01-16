import { head } from 'ramda';

import JsonNode from './JsonNode';

class JsonDocument extends JsonNode {
  public readonly type: string = 'document';

  public get child(): unknown | null {
    return head(this.children);
  }
}

export default JsonDocument;
