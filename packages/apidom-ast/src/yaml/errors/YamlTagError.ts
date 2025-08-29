import type { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import YamlSchemaError from './YamlSchemaError.ts';
import Node from '../../Node.ts';

/**
 * @public
 */
export interface YamlTagErrorOptions<T extends Node = Node> extends ApiDOMErrorOptions {
  readonly specificTagName: string;
  readonly explicitTagName: string;
  readonly tagKind: string;
  readonly tagStartPositionRow?: number;
  readonly tagStartPositionColumn?: number;
  readonly tagStartPositionIndex?: number;
  readonly tagEndPositionRow?: number;
  readonly tagEndPositionColumn?: number;
  readonly tagEndPositionIndex?: number;
  readonly nodeCanonicalContent?: string;
  readonly node?: T;
}

/**
 * @public
 */
class YamlTagError extends YamlSchemaError {
  public readonly specificTagName!: string;

  public readonly explicitTagName!: string;

  public readonly tagKind!: string;

  public readonly tagStartPositionRow?: number;

  public readonly tagStartPositionColumn?: number;

  public readonly tagStartPositionIndex?: number;

  public readonly tagEndPositionRow?: number;

  public readonly tagEndPositionColumn?: number;

  public readonly tagEndPositionIndex?: number;

  public readonly nodeCanonicalContent?: string;

  public readonly node?: unknown;

  constructor(message?: string, structuredOptions?: YamlTagErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.specificTagName = structuredOptions.specificTagName;
      this.explicitTagName = structuredOptions.explicitTagName;
      this.tagKind = structuredOptions.tagKind;
      this.tagStartPositionRow = structuredOptions.tagStartPositionRow;
      this.tagStartPositionColumn = structuredOptions.tagStartPositionColumn;
      this.tagStartPositionIndex = structuredOptions.tagStartPositionIndex;
      this.tagEndPositionRow = structuredOptions.tagEndPositionRow;
      this.tagEndPositionColumn = structuredOptions.tagEndPositionColumn;
      this.tagEndPositionIndex = structuredOptions.tagEndPositionIndex;
      this.nodeCanonicalContent = structuredOptions.nodeCanonicalContent;
      this.node = structuredOptions.node;
    }
  }
}

export default YamlTagError;
