import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import YamlSchemaError from './YamlSchemaError';
import Position from '../../Position';
import Node from '../../Node';

export interface YamlTagErrorOptions<T extends Node = Node> extends ApiDOMErrorOptions {
  readonly specificTagName: string;
  readonly explicitTagName: string;
  readonly tagKind: string;
  readonly tagPosition?: Position;
  readonly nodeCanonicalContent?: string;
  readonly node?: T;
}

class YamlTagError extends YamlSchemaError {
  public readonly specificTagName!: string;

  public readonly explicitTagName!: string;

  public readonly tagKind!: string;

  public readonly tagPosition?: Position;

  public readonly nodeCanonicalContent?: string;

  public readonly node?: unknown;

  constructor(message?: string, structuredOptions?: YamlTagErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.specificTagName = structuredOptions.specificTagName;
      this.explicitTagName = structuredOptions.explicitTagName;
      this.tagKind = structuredOptions.tagKind;
      this.tagPosition = structuredOptions.tagPosition;
      this.nodeCanonicalContent = structuredOptions.nodeCanonicalContent;
      this.node = structuredOptions.node;
    }
  }
}

export default YamlTagError;
