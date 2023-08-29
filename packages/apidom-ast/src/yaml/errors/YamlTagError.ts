import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import YamlSchemaError from './YamlSchemaError';
import Position from '../../Position';

export interface YamlTagErrorOptions extends ApiDOMErrorOptions {
  readonly specificTagName: string;
  readonly explicitTagName: string;
  readonly tagKind: string;
  readonly tagPosition?: Position;
  readonly nodeCanonicalContent?: string;
}

class YamlTagError extends YamlSchemaError {
  public readonly specificTagName!: string;

  public readonly explicitTagName!: string;

  public readonly tagKind!: string;

  public readonly tagPosition?: Position;

  public readonly nodeCanonicalContent?: string;

  constructor(message?: string, structuredOptions?: YamlTagErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.specificTagName = structuredOptions.specificTagName;
      this.explicitTagName = structuredOptions.explicitTagName;
      this.tagKind = structuredOptions.tagKind;
      this.tagPosition = structuredOptions.tagPosition;
      this.nodeCanonicalContent = structuredOptions.nodeCanonicalContent;
    }
  }
}

export default YamlTagError;
